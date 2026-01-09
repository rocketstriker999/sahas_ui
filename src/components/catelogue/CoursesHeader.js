import { Button } from "primereact/button";
import TabHeader from "../common/TabHeader";
import DialogAddCourse from "./DialogAddCourse";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { getViewIndex } from "../../utils";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function CoursesHeader({ courses, category, setCourses, updatingViewIndex, setUpdatingViewIndex }) {
    const { requestAPI, showToast } = useAppContext();

    const [dialogAddCourse, setDialogAddCourse] = useState({
        visible: false,
        categoryId: category?.id,
    });

    const closeDialogAddCourse = useCallback(() => {
        setDialogAddCourse((prev) => ({ ...prev, visible: false }));
    }, []);

    const [loading, setLoading] = useState();

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `courses/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: courses.map(({ id }, view_index) => ({ id, view_index })),
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
    }, [courses, requestAPI, showToast]);

    return (
        <div>
            <TabHeader
                className={"px-3 pt-3"}
                title={category?.title}
                highlights={[`${category?.courses_count} Courses`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                        <Button
                            disabled={loading}
                            onClick={() =>
                                setDialogAddCourse((prev) => ({
                                    ...prev,
                                    view_index: getViewIndex(courses),
                                    visible: true,
                                    setCourses,
                                    closeDialog: closeDialogAddCourse,
                                }))
                            }
                            icon="pi pi-plus"
                            severity="warning"
                        />
                    </HasRequiredAuthority>,
                    !!courses?.length && (
                        <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
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
                        </HasRequiredAuthority>
                    ),
                ]}
            />

            {dialogAddCourse?.visible && <DialogAddCourse {...dialogAddCourse} />}
        </div>
    );
}
