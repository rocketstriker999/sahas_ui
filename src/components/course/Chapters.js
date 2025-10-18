import { TabView, TabPanel } from "primereact/tabview";
import { ChaptersHead } from "./ChaptersHead";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import NoContent from "../common/NoContent";
import TabHeader from "../common/TabHeader";
import { Divider } from "primereact/divider";
import Loading from "../common/Loading";
import OrderManager from "../common/OrderManager";
import { Button } from "primereact/button";

export function Chapters() {
    const { subjectId } = useParams();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [updating, setUpdating] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

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

    console.log(chapterTabs);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : chapterTabs?.length ? (
                <TabView>
                    {chapterTabs.map((chaptersTab) => (
                        <TabPanel key={chaptersTab?.id} headerTemplate={(option) => <ChaptersHead {...option} {...chaptersTab} />}>
                            <p className="m-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </TabPanel>
                    ))}
                </TabView>
            ) : (
                <NoContent />
            )}
        </div>
    );
}
