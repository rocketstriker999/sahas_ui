import { useOutletContext, useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import { useEffect, useMemo, useState } from "react";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { TabPanel, TabView } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import { MediaTypeHead } from "../components/chapter/MediaTypeHead";
import { BlockUI } from "primereact/blockui";
import ChapterHead from "../components/chapter/ChapterHead";
import OrderManager from "../components/common/OrderManager";

export default function Chapter() {
    const { chapterId } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [media, setMedia] = useState();

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
                onResponseReceieved: (media, responseCode) => {
                    if (media && responseCode === 200) {
                        setMedia(media);
                    }
                },
            });
    }, [chapterId, requestAPI]);

    const mediaTabs = useMemo(
        () => media_types.map((mediaType) => ({ title: mediaType, media: media?.filter(({ type }) => type.toLowerCase() === mediaType.toLowerCase()) })),
        [media, media_types]
    );

    return (
        <div className="flex flex-column h-full">
            <ChapterHead {...{ updatingViewIndex, setUpdatingViewIndex, setLoading, setError, media, setMedia }} />

            {loading ? (
                <Loading message="Fetching Media" />
            ) : error ? (
                <NoContent error={error} />
            ) : media ? (
                <div className="flex flex-column h-full ">
                    <TabView
                        pt={{
                            panelcontainer: classNames("p-0"),
                        }}
                    >
                        {mediaTabs.map((mediaTab) => (
                            <TabPanel key={mediaTab?.title} headerTemplate={(option) => <MediaTypeHead {...option} {...mediaTab} />}>
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
                                            setItems={setMedia}
                                            emptyItemsError="No Chapters Found"
                                            itemTemplate={(item) => <p>hello</p>}
                                        />
                                    }
                                </BlockUI>
                            </TabPanel>
                        ))}
                    </TabView>
                </div>
            ) : (
                <NoContent error={"No Media Found"} />
            )}
        </div>
    );
}
