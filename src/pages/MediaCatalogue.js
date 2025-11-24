import { useOutletContext, useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { TabPanel, TabView } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import { MediaType } from "../components/media_catalogue.js/MediaType";
import { BlockUI } from "primereact/blockui";
import ChapterHead from "../components/media_catalogue.js/ChapterHead";
import OrderManager from "../components/common/OrderManager";
import Media from "../components/media_catalogue.js/Media";
import DialogAddMedia from "../components/media_catalogue.js/DialogAddMedia";

export default function MediaCatalogue() {
    const { chapterId } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [mediaCatalogue, setMediaCatalogue] = useState();
    const { requestAPI } = useAppContext();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();
    const { enrollment } = useOutletContext();
    const { media_types = [] } = useSelector((state) => state.stateTemplateConfig?.chapter);

    useEffect(() => {
        if (chapterId)
            requestAPI({
                requestPath: `chapters/${chapterId}/media`,
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (mediaCatalogue, responseCode) => {
                    if (mediaCatalogue && responseCode === 200) {
                        setMediaCatalogue(mediaCatalogue);
                    }
                },
            });
    }, [chapterId, requestAPI]);

    const mediaTabs = useMemo(
        () =>
            media_types.map((mediaType) => ({ title: mediaType, media: mediaCatalogue?.filter(({ type }) => type.toLowerCase() === mediaType.toLowerCase()) })),
        [mediaCatalogue, media_types]
    );

    const [dialogAddMedia, setDialogAddMedia] = useState({
        chapterId,
        visible: false,
    });

    const closeDialogAddMedia = useCallback(() => {
        setDialogAddMedia((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="flex flex-column h-full">
            <ChapterHead
                {...{
                    chapterId,
                    setLoading,
                    setError,
                    mediaCatalogue,
                    setMediaCatalogue,
                    updatingViewIndex,
                    setUpdatingViewIndex,
                    setDialogAddMedia,
                    closeDialogAddMedia,
                }}
            />

            {loading ? (
                <Loading message="Fetching Media" />
            ) : error ? (
                <NoContent error={error} />
            ) : (
                <div className="flex flex-column h-full ">
                    <TabView
                        pt={{
                            panelcontainer: classNames("p-0"),
                        }}
                    >
                        {mediaTabs.map((mediaTab) => (
                            <TabPanel key={mediaTab?.title} headerTemplate={(option) => <MediaType {...option} {...mediaTab} />}>
                                <BlockUI
                                    pt={{
                                        root: classNames("mx-2"),
                                        mask: "bg-black-alpha-80 align-items-start p-4",
                                    }}
                                    blocked={false ? !enrollment?.digital_access : false}
                                    template={
                                        <div className="text-white flex flex-column align-items-center">
                                            <i className="pi pi-lock" style={{ fontSize: "3rem" }}></i>
                                            <p>You Don't Have Access To This Content</p>
                                        </div>
                                    }
                                >
                                    {
                                        <OrderManager
                                            updatingViewIndex={updatingViewIndex}
                                            items={mediaTab?.media}
                                            setItems={setMediaCatalogue}
                                            emptyItemsError="No Media Found"
                                            itemTemplate={(item) => (
                                                <Media setMediaCatalogue={setMediaCatalogue} {...item} updatingViewIndex={updatingViewIndex} />
                                            )}
                                        />
                                    }
                                </BlockUI>
                            </TabPanel>
                        ))}
                    </TabView>
                </div>
            )}
            {dialogAddMedia?.visible && <DialogAddMedia {...dialogAddMedia} />}
        </div>
    );
}
