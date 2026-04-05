import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import OrderManager from "../common/OrderManager";
import Category from "./question_categories/Category";
import DialogAddCategory from "./question_categories/DialogAddCategory";
import DialogEditCategory from "./question_categories/DialogEditCategory";

export default function QuestionCategories() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [categories, setCategories] = useState();

    const [dialogEditCategory, setDialogEditCategory] = useState({ visible: false });

    const closeDialogEditCategory = useCallback(() => {
        setDialogEditCategory((prev) => ({ ...prev, visible: false }));
    }, []);

    const [dialogAddCategory, setDialogAddCategory] = useState({
        visible: false,
    });

    const closeDialogAddCategory = useCallback(() => {
        setDialogAddCategory((prev) => ({ ...prev, visible: false }));
    }, []);

    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-question-categories/view_indexes`,
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

    useEffect(() => {
        requestAPI({
            requestPath: `stream-selection-question-categories`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (categories, responseCode) => {
                if (categories && responseCode === 200) {
                    setCategories(categories);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Psychometric Test Question Categories !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

    return (
        <div className="flex-1 flex flex-column min-h-0 h-full">
            <TabHeader
                className={"mx-3 mt-2"}
                title="P.C.A.T.  Categories"
                highlights={[`Following Questions Will Be Asked For P.C.A.T.`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_STREAM_SELECTION_QUESTION_CATEGORY}>
                        <Button
                            icon="pi pi-plus"
                            severity="warning"
                            onClick={() =>
                                setDialogAddCategory((prev) => ({
                                    ...prev,
                                    setCategories,
                                    visible: true,
                                    closeDialog: closeDialogAddCategory,
                                }))
                            }
                        />
                    </HasRequiredAuthority>,

                    !!categories?.length && (
                        <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_STREAM_SELECTION_QUESTION_CATEGORY}>
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
            <Divider />

            <div className="flex-1 overflow-y-scroll ">
                <OrderManager
                    loading={loading}
                    updatingViewIndex={updatingViewIndex}
                    items={categories}
                    setItems={setCategories}
                    entity={"Categories/Questions"}
                    itemTemplate={(item) => (
                        <Category updatingViewIndex={updatingViewIndex} {...item} setCategories={setCategories} setDialogEditCategory={setDialogEditCategory} />
                    )}
                />
            </div>

            {dialogAddCategory?.visible && <DialogAddCategory {...dialogAddCategory} />}
            {dialogEditCategory?.visible && <DialogEditCategory {...dialogEditCategory} closeDialog={closeDialogEditCategory} />}
        </div>
    );
}
