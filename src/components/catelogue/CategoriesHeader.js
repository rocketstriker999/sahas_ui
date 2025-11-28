import { useCallback, useState } from "react";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import DialogAddCategory from "./DialogAddCategory";

export default function CategoriesHeader({ categories, updatingViewIndex, setUpdatingViewIndex }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `course-categories/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: categories.map(({ id }, view_index) => ({ id, view_index })),
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
    }, [categories, requestAPI, showToast]);

    const [dialogAddCategory, setDialogAddCategory] = useState({
        visible: false,
    });

    const closeDialogAddCategory = useCallback(() => {
        setDialogAddCategory((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div>
            <TabHeader
                className={"px-3 pt-3"}
                title="Course Categories"
                highlights={["New Enrollments Can be Happen Here", "Enrolled Courses Can Be Explored"]}
                actionItems={[
                    <Button
                        onClick={() =>
                            setDialogAddCategory((prev) => ({
                                ...prev,
                                view_index: categories?.length ? categories[0]?.view_index - 1 : 0,
                                visible: true,
                                closeDialog: closeDialogAddCategory,
                            }))
                        }
                        icon="pi pi-plus"
                        severity="warning"
                    />,
                    <Button
                        loading={loading}
                        disabled={!categories?.length}
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
            <DialogAddCategory {...dialogAddCategory} />
        </div>
    );
}
