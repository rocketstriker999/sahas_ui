import { useCallback, useEffect, useState } from "react";
import TabHeader from "../common/TabHeader";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import DialogAddChapter from "./DialogAddChapter";
import { getViewIndex } from "../../utils";
import NoContent from "../common/NoContent";

export default function ChaptersHead({
    enrollment,
    setLoading,
    setError,
    chapters,
    setChapters,
    updatingViewIndex,
    setUpdatingViewIndex,
    setDialogEditQuizConfig,
}) {
    const { requestAPI, showToast } = useAppContext();
    const { subjectId } = useParams();
    const [subject, setSubject] = useState();
    const [updating, setUpdating] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `subjects/${subjectId}`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Subject !", life: 2000 }),
            onResponseReceieved: (subject, responseCode) => {
                if (subject && responseCode === 200) setSubject(subject);
                else setError("Couldn't load Chapter Tabs");
            },
        });
    }, [requestAPI, setError, setLoading, showToast, subjectId]);

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
    }, [chapters, requestAPI, setUpdating, showToast]);

    const [dialogAddChapter, setDialogAddChapter] = useState({
        subjectId,
        visible: false,
    });
    const closeDialogAddChapter = useCallback(() => {
        setDialogAddChapter((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div>
            <TabHeader
                className={"p-3 bg-gray-100"}
                title={`${subject?.title} Chapters`}
                highlights={[`Demo Chapters Requires No Enrollment`, `Chapters Are Categorized Into Sections`]}
                actionItems={[
                    <Button
                        onClick={() =>
                            setDialogAddChapter((prev) => ({
                                ...prev,
                                visible: true,
                                setChapters,
                                closeDialog: closeDialogAddChapter,
                                view_index: getViewIndex(chapters),
                            }))
                        }
                        icon="pi pi-plus"
                        severity="warning"
                    />,
                    !!chapters?.length && (
                        <Button
                            loading={updating}
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
                        />
                    ),
                ]}
            />

            {!!enrollment?.digital_access && (
                <div className="flex align-items-center gap-2 px-2">
                    <Button
                        severity="warning"
                        onClick={() => {
                            setDialogEditQuizConfig((prev) => ({
                                ...prev,
                                visible: true,
                                subject,
                                setSubject,
                            }));
                        }}
                        icon="pi pi-pencil"
                    />
                    <Button
                        disabled={!subject?.quiz_active}
                        className="flex-1"
                        onClick={() => {}}
                        label="Launch Quiz "
                        iconPos="right"
                        icon="pi pi-question-circle"
                    />
                    <Button severity="warning" disabled={!chapters?.length} onClick={() => {}} icon="pi pi-history" />
                </div>
            )}

            {dialogAddChapter?.visible && <DialogAddChapter {...dialogAddChapter} />}
        </div>
    );
}
