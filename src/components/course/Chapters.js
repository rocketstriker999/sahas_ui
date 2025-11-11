import { TabView, TabPanel } from "primereact/tabview";
import { ChaptersTypeHead } from "./ChaptersTypeHead";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import NoContent from "../common/NoContent";
import { BlockUI } from "primereact/blockui";
import Chapter from "./Chapter";
import Loading from "../common/Loading";
import DialogAddChapter from "./DialogAddChapter";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import TabHeader from "../common/TabHeader";
import OrderManager from "../common/OrderManager";

export function Chapters() {
    const { courseId } = useParams();

    const { subjectId } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [updating, setUpdating] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();
    const { requestAPI, showToast } = useAppContext();
    const { chapter_types = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const [chapters, setChapters] = useState();
    const { digitallyEnrolledCourses } = useSelector((state) => state.stateUser);

    const [dialogAddChapter, setDialogAddChapter] = useState({
        subjectId,
        visible: false,
    });

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

    const closeDialogAddChapter = useCallback(() => {
        setDialogAddChapter((prev) => ({ ...prev, visible: false }));
    }, []);

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
                className={"p-3"}
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
                            <BlockUI
                                pt={{
                                    root: classNames("mx-2"),
                                    mask: "bg-black-alpha-80 align-items-start p-4",
                                }}
                                blocked={chaptersTab?.requires_digital_enrollment_access ? !digitallyEnrolledCourses?.find(({ id }) => id === courseId) : false}
                                template={
                                    <div className="text-white flex flex-column align-items-center">
                                        <i className="pi pi-lock" style={{ fontSize: "3rem" }}></i>
                                        <p>You Don't Have Access To This Content</p>
                                    </div>
                                }
                            >
                                {console.log(chaptersTab?.title)}
                                {console.log(
                                    chaptersTab?.requires_digital_enrollment_access ? !digitallyEnrolledCourses?.find(({ id }) => id === courseId) : false
                                )}
                                <OrderManager
                                    updatingViewIndex={updatingViewIndex}
                                    items={chaptersTab?.chapters}
                                    setItems={setChapters}
                                    emptyItemsError="No Chapters Found"
                                    itemTemplate={(item) => <Chapter setChapters={setChapters} {...item} updatingViewIndex={updatingViewIndex} />}
                                />
                            </BlockUI>
                        </TabPanel>
                    ))}
                </TabView>
            ) : (
                <NoContent />
            )}
            {dialogAddChapter?.visible && <DialogAddChapter {...dialogAddChapter} />}
        </div>
    );
}
