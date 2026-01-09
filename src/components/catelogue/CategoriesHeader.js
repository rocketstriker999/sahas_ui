import { useCallback, useState } from "react";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import DialogAddCategory from "./DialogAddCategory";
import { getViewIndex } from "../../utils";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

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
                highlights={[`Total ${categories?.length} Categories`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                        <Button
                            onClick={() =>
                                setDialogAddCategory((prev) => ({
                                    ...prev,
                                    view_index: getViewIndex(categories),
                                    visible: true,
                                    closeDialog: closeDialogAddCategory,
                                }))
                            }
                            icon="pi pi-plus"
                            severity="warning"
                        />
                    </HasRequiredAuthority>,
                    !!categories?.length && (
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
            {dialogAddCategory?.visible && <DialogAddCategory {...dialogAddCategory} />}
        </div>
    );
}
