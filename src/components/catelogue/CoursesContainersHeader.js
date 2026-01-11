import { Button } from "primereact/button";
import TabHeader from "../common/TabHeader";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { getViewIndex } from "../../utils";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";
import DialogAddCoursesContainer from "./DialogAddCoursesContainer";

export default function CoursesContainersHeader({ coursesContainers, category, setCoursesContainers, updatingViewIndex, setUpdatingViewIndex }) {
    const { requestAPI, showToast } = useAppContext();
    const [dialogAddCoursesContainer, setDialogAddCoursesContainer] = useState({
        visible: false,
        categoryId: category?.id,
    });
    const closeDialogAddCoursesContainer = useCallback(() => {
        setDialogAddCoursesContainer((prev) => ({ ...prev, visible: false }));
    }, []);
    const [loading, setLoading] = useState();
    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `courses-containers/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: coursesContainers.map(({ id }, view_index) => ({ id, view_index })),
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
    }, [coursesContainers, requestAPI, showToast]);
    return (
        <div>
            <TabHeader
                className={"px-3 pt-3"}
                title={category?.title}
                highlights={[`${category?.courses_containers_count} Courses`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                        <Button
                            disabled={loading}
                            onClick={() =>
                                setDialogAddCoursesContainer((prev) => ({
                                    ...prev,
                                    view_index: getViewIndex(coursesContainers),
                                    visible: true,
                                    setCoursesContainers,
                                    closeDialog: closeDialogAddCoursesContainer,
                                }))
                            }
                            icon="pi pi-plus"
                            severity="warning"
                        />
                    </HasRequiredAuthority>,
                    !!coursesContainers?.length && (
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
            {dialogAddCoursesContainer?.visible && <DialogAddCoursesContainer {...dialogAddCoursesContainer} />}
        </div>
    );
}
