import { TabView, TabPanel } from "primereact/tabview";
import { ChaptersTypeHead } from "./ChaptersTypeHead";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import NoContent from "../common/NoContent";
import { BlockUI } from "primereact/blockui";
import Chapter from "./Chapter";
import { classNames } from "primereact/utils";
import OrderManager from "../common/OrderManager";
import ChaptersHead from "./ChaptersHead";
import DialogEditQuizConfig from "./DialogEditQuizConfig";
import DialogEditChapter from "./DialogEditChapter";

export function Chapters() {
    const { subjectId } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [dialogEditQuizConfig, setDialogEditQuizConfig] = useState({
        visible: false,
    });

    const closeDialogEditQuizConfig = useCallback(() => {
        setDialogEditQuizConfig((prev) => ({ ...prev, visible: false }));
    }, []);

    const [dialogEditChapter, setDialogEditChapter] = useState({
        visible: false,
    });

    const closeDialogEditChapter = useCallback(() => {
        setDialogEditChapter((prev) => ({ ...prev, visible: false }));
    }, []);

    const [updatingViewIndex, setUpdatingViewIndex] = useState();
    const { requestAPI } = useAppContext();
    const { chapter_types = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const [chapters, setChapters] = useState();

    const { enrollment } = useOutletContext();

    const chapterTabs = useMemo(
        () => chapter_types.map((chapterType) => ({ ...chapterType, chapters: chapters?.filter(({ type }) => type === chapterType.id) })),
        [chapter_types, chapters]
    );

    useEffect(() => {
        requestAPI({
            requestPath: `subjects/${subjectId}/chapters`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (chapters, responseCode) => {
                if (chapters && responseCode === 200) {
                    setChapters(chapters);
                } else {
                    setError("Couldn't load Chapter Tabs");
                }
            },
        });
    }, [chapter_types, requestAPI, subjectId]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column gap-2">
            <ChaptersHead
                {...{
                    enrollment,
                    setLoading,
                    setError,
                    chapters,
                    setChapters,
                    updatingViewIndex,
                    setUpdatingViewIndex,
                    setDialogEditQuizConfig,
                }}
            />

            {chapterTabs?.length ? (
                <TabView
                    pt={{
                        root: classNames("overflow-hidden flex flex-column flex-1"),
                        panelcontainer: classNames("p-0 flex-1 overflow-y-scroll"),
                    }}
                >
                    {chapterTabs.map((chaptersTab) => (
                        <TabPanel key={chaptersTab?.id} headerTemplate={(option) => <ChaptersTypeHead {...option} {...chaptersTab} />}>
                            <BlockUI
                                pt={{
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
                                    error={error}
                                    lodaing={loading}
                                    updatingViewIndex={updatingViewIndex}
                                    items={chaptersTab?.chapters}
                                    setItems={setChapters}
                                    entity={"Chapters"}
                                    itemTemplate={(item) => (
                                        <Chapter
                                            setChapters={setChapters}
                                            {...item}
                                            updatingViewIndex={updatingViewIndex}
                                            setDialogEditChapter={setDialogEditChapter}
                                        />
                                    )}
                                />
                            </BlockUI>
                        </TabPanel>
                    ))}
                </TabView>
            ) : (
                <NoContent />
            )}
            {dialogEditQuizConfig?.visible && <DialogEditQuizConfig {...dialogEditQuizConfig} closeDialog={closeDialogEditQuizConfig} />}
            {dialogEditChapter?.visible && <DialogEditChapter {...dialogEditChapter} closeDialog={closeDialogEditChapter} />}
        </div>
    );
}
