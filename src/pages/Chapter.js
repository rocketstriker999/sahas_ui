import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import { useEffect, useMemo, useState } from "react";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { BreadCrumb } from "primereact/breadcrumb";
import { TabPanel, TabView } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";

import { MediaTypeHead } from "../components/chapter/MediaTypeHead";
import { Button } from "primereact/button";

export default function Chapter() {
    const { chapterId } = useParams();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [media, setMedia] = useState();
    const navigate = useNavigate();

    const { subject, chapter } = useOutletContext();

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
        () => media_types.map((mediaType) => ({ title: mediaType, chapters: media?.filter(({ type }) => type.toLowerCase() === mediaType.toLowerCase()) })),
        [media, media_types]
    );

    const items = [
        {
            label: subject?.title,
            command: () => navigate(-2),
        },
        { label: chapter?.title, command: () => navigate(-1) },
    ];

    return (
        <div className="flex flex-column h-full ">
            {chapter?.title && subject?.title && (
                <BreadCrumb pt={{ root: classNames("font-bold text-sm border-noround bg-gray-800"), label: classNames("text-white") }} model={items} />
            )}

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
                                {/* <BlockUI
                                    pt={{
                                        root: classNames("mx-2"),
                                        mask: "bg-black-alpha-80 align-items-start p-4",
                                    }}
                                    blocked={!!chaptersTab?.requires_enrollment_digital_access ? !enrollment?.digital_access : false}
                                    template={
                                        <div className="text-white flex flex-column align-items-center">
                                            <i className="pi pi-lock" style={{ fontSize: "3rem" }}></i>
                                            <p>You Don't Have Access To This Content</p>
                                        </div>
                                    }
                                >
                                    <OrderManager
                                        updatingViewIndex={updatingViewIndex}
                                        items={chaptersTab?.chapters}
                                        setItems={setChapters}
                                        emptyItemsError="No Chapters Found"
                                        itemTemplate={(item) => <Chapter setChapters={setChapters} {...item} updatingViewIndex={updatingViewIndex} />}
                                    />
                                </BlockUI> */}
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
