import { TabView, TabPanel } from "primereact/tabview";
import { ChaptersTypeHead } from "./ChaptersTypeHead";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import NoContent from "../common/NoContent";

import Loading from "../common/Loading";

import ChaptersBody from "./ChaptersTypeBody";
import { classNames } from "primereact/utils";

export function Chapters() {
    const { subjectId } = useParams();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const { chapter_types = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const [chapterTabs, setChapterTabs] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `subjects/${subjectId}/chapters`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (chapters, responseCode) => {
                if (chapters && responseCode === 200) {
                    setChapterTabs(() =>
                        chapter_types.map((chapterType) => ({ ...chapterType, chapters: chapters?.filter(({ type }) => type === chapterType.id) }))
                    );
                } else {
                    setError("Couldn't load Courses");
                }
            },
        });
    }, [chapter_types, requestAPI, subjectId]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : chapterTabs?.length ? (
                <TabView
                    pt={{
                        panelcontainer: classNames("p-0"),
                    }}
                >
                    {chapterTabs.map((chaptersTab) => (
                        <TabPanel key={chaptersTab?.id} headerTemplate={(option) => <ChaptersTypeHead {...option} {...chaptersTab} />}>
                            <ChaptersBody chapters={chaptersTab?.chapters} />
                        </TabPanel>
                    ))}
                </TabView>
            ) : (
                <NoContent />
            )}
        </div>
    );
}
