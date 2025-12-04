import { Button } from "primereact/button";
import TabHeader from "../common/TabHeader";
import { getViewIndex } from "../../utils";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import DialogAssignSubjects from "./DialogAssignSubjects";
import DialogAddSubject from "./DialogAddSubject";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function SubjectsHead({ courseId, subjects, setSubjects, updatingViewIndex, setUpdatingViewIndex }) {
    const { showToast, requestAPI } = useAppContext();

    const [loading, setLoading] = useState();

    const [dialogAddSubject, setDialogAddSubject] = useState({
        courseId,
        visible: false,
    });

    const [dialogAssignSubjects, setDialogAssignSubjects] = useState({
        courseId,
        visible: false,
    });

    const closeDialogAddSubject = useCallback(() => {
        setDialogAddSubject((prev) => ({ ...prev, visible: false }));
    }, []);

    const closeDialogAssignSubjects = useCallback(() => {
        setDialogAssignSubjects((prev) => ({ ...prev, visible: false }));
    }, []);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `course-subjects/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: subjects.map(({ id }, view_index) => ({ id, view_index })),
            setLoading: setLoading,
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
    }, [subjects, requestAPI, showToast]);

    return (
        <div>
            <TabHeader
                className={"p-3 bg-gray-900 text-white"}
                title="Subjects"
                highlights={[`Total ${subjects?.length} Subjects`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                        <Button
                            disabled={loading}
                            onClick={() => {
                                console.log("subjects at open add:", subjects);
                                const viewIndex = getViewIndex(Array.isArray(subjects) ? subjects : []);
                                console.log("computed viewIndex:", viewIndex, typeof viewIndex);
                                setDialogAddSubject((prev) => ({
                                    ...prev,
                                    visible: true,
                                    setSubjects,
                                    view_index: getViewIndex(subjects),
                                    closeDialog: closeDialogAddSubject,
                                }));
                            }}
                            icon="pi pi-plus"
                            severity="warning"
                        />
                    </HasRequiredAuthority>,
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                        <Button
                            disabled={loading}
                            onClick={() =>
                                setDialogAssignSubjects((prev) => ({
                                    ...prev,
                                    visible: true,
                                    courseSubjects: subjects,
                                    setCourseSubjects: setSubjects,
                                    closeDialog: closeDialogAssignSubjects,
                                    view_index: getViewIndex(subjects),
                                }))
                            }
                            icon="pi pi-list-check"
                            severity="info"
                        />
                    </HasRequiredAuthority>,
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                        {!!subjects?.length && (
                            <Button
                                loading={loading}
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
                        )}
                    </HasRequiredAuthority>,
                ]}
            />
            {dialogAddSubject?.visible && <DialogAddSubject {...dialogAddSubject} />}
            {dialogAssignSubjects?.visible && <DialogAssignSubjects {...dialogAssignSubjects} />}
        </div>
    );
}
