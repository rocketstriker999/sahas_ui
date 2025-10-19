import { useCallback, useState } from "react";
import OrderManager from "../common/OrderManager";
import Chapter from "./Chapter";
import { Divider } from "primereact/divider";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useParams } from "react-router-dom";
import DialogAddChapter from "./DialogAddChapter";

export default function ChaptersTypeBody({ id, chapters, setChapterTabs }) {
    const [updating, setUpdating] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();
    const { requestAPI, showToast } = useAppContext();

    const { subjectId } = useParams();

    const [dialogAddChapter, setDialogAddChapter] = useState({
        subjectId,
        visible: false,
    });

    const closeDialogAddChapter = useCallback(() => {
        setDialogAddChapter((prev) => ({ ...prev, visible: false }));
    }, []);

    const setChapters = useCallback(
        (callBack) =>
            setChapterTabs((prev) => prev?.map((chapterTab) => (chapterTab?.id === id ? { ...chapterTab, chapters: callBack(chapters) } : chapterTab))),
        [chapters, id, setChapterTabs]
    );

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `chapters/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: chapters.map(({ id }, view_index) => ({ id, view_index })),
            setLoading: setUpdating,
            parseResponseBody: false,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update View Indexes !", life: 2000 }),
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 200) {
                    showToast({
                        severity: "success",
                        summary: "Updated",
                        detail: `View Indexes Updated`,
                        life: 1000,
                    });
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Update View Indexes !", life: 2000 });
                }
            },
        });
    }, [chapters, requestAPI, showToast]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <TabHeader
                className={"px-3 mt-2"}
                title="Chapters"
                highlights={[`Demo Chapters Requires No Enrollment`, `Chapteers Are Categorized Into Sections`]}
                actionItems={[
                    <Button
                        onClick={() => setDialogAddChapter((prev) => ({ ...prev, visible: true, setChapters, closeDialog: closeDialogAddChapter }))}
                        icon="pi pi-plus"
                        severity="warning"
                    />,

                    <Button
                        loading={updating}
                        disabled={!chapters?.length}
                        onClick={() => {
                            showToast({
                                severity: "info",
                                summary: "Repositioning",
                                detail: `Repositioning Mode ${!updatingViewIndex ? "Enabled" : "Disabled"}`,
                                life: 1000,
                            });
                            //give signal to update view indexs
                            if (!!updatingViewIndex) {
                                updateViewIndexs();
                            }
                            setUpdatingViewIndex((prev) => !prev);
                        }}
                        icon="pi pi-arrows-v"
                    />,
                ]}
            />
            <Divider />
            <OrderManager
                updatingViewIndex={updatingViewIndex}
                items={chapters}
                setItems={setChapters}
                emptyItemsError="No Chapters Found"
                itemTemplate={(item) => <Chapter setChapters={setChapters} {...item} updatingViewIndex={updatingViewIndex} />}
            />

            {dialogAddChapter?.visible && <DialogAddChapter {...dialogAddChapter} />}
        </div>
    );
}
