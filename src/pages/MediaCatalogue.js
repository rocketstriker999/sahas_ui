import { useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import { useEffect, useMemo, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import { MediaType } from "../components/media_catalogue/MediaType";
import ChapterHead from "../components/media_catalogue/ChapterHead";
import OrderManager from "../components/common/OrderManager";
import Media from "../components/media_catalogue/Media";
import QuizHead from "../components/media_catalogue/QuizHead";

export default function MediaCatalogue() {
    const { chapterId } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [mediaCatalogue, setMediaCatalogue] = useState();
    const { requestAPI } = useAppContext();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();
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

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <ChapterHead
                {...{
                    chapterId,
                    setLoading,
                    setError,
                    mediaCatalogue,
                    setMediaCatalogue,
                    updatingViewIndex,
                    setUpdatingViewIndex,
                }}
            />

            <TabView
                pt={{
                    root: classNames("overflow-hidden flex flex-column flex-1"),
                    panelcontainer: classNames("p-0 flex-1 overflow-y-scroll"),
                }}
            >
                {mediaTabs.map((mediaTab) => (
                    <TabPanel key={mediaTab?.title} headerTemplate={(option) => <MediaType {...option} {...mediaTab} />}>
                        <OrderManager
                            error={error}
                            loading={loading}
                            updatingViewIndex={updatingViewIndex}
                            items={mediaTab?.media}
                            setItems={setMediaCatalogue}
                            entity="Media"
                            itemTemplate={(item) => <Media setMediaCatalogue={setMediaCatalogue} {...item} updatingViewIndex={updatingViewIndex} />}
                        />
                    </TabPanel>
                ))}

                <TabPanel key={"Quiz"} headerTemplate={(option) => <MediaType {...option} title="QUIZ" />}>
                    <QuizHead />
                    {/*  */}
                    {/*  */}

                    {/*  */}
                </TabPanel>
            </TabView>
        </div>
    );
}
