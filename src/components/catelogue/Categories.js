import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";

import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import DialogAddCategory from "./DialogAddCategory";
import Category from "./Category";
import { Divider } from "primereact/divider";
import OrderManager from "../common/OrderManager";
import { useOutletContext } from "react-router-dom";
import NoContent from "../common/NoContent";

export default function Categories() {
    const [updating, setUpdating] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const { requestAPI, showToast } = useAppContext();

    const { categories, setCategories } = useOutletContext();

    const [dialogAddCategory, setDialogAddCategory] = useState({
        visible: false,
    });

    const closeDialogAddCategory = useCallback(() => {
        setDialogAddCategory((prev) => ({ ...prev, visible: false }));
    }, []);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `course-categories/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: categories.map(({ id }, view_index) => ({ id, view_index })),
            setUpdating: setUpdating,
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

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <TabHeader
                className={"px-3 pt-3"}
                title="Course Categories"
                highlights={["New Enrollments Can be Happen Here", "Enrolled Courses Can Be Explored"]}
                actionItems={[
                    <Button
                        onClick={() => setDialogAddCategory((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddCategory }))}
                        icon="pi pi-plus"
                        severity="warning"
                    />,
                    <Button
                        loading={updating}
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
                        icon="pi pi-list"
                    />,
                ]}
            />

            <Divider />

            {categories?.length ? (
                <OrderManager
                    updatingViewIndex={updatingViewIndex}
                    items={categories}
                    setItems={setCategories}
                    itemTemplate={(item) => <Category {...item} updatingViewIndex={updatingViewIndex} />}
                />
            ) : (
                <NoContent error="No Course Categories Found" />
            )}

            <DialogAddCategory {...dialogAddCategory} />
        </div>
    );
}
