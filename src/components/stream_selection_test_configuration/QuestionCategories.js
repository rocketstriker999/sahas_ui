import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

import OrderManager from "../common/OrderManager";
import { Fieldset } from "primereact/fieldset";
import CategoryHead from "./question_categories/CategoryHead";
import DialogAddCategory from "./question_categories/DialogAddCategory";
import DialogEditCategory from "./question_categories/DialogEditCategory";
import Questions from "./question_categories/Questions";
import { classNames } from "primereact/utils";

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
                title="P.C.A.T. Questions & Categories"
                highlights={[`Following Questions Will Be Asked For P.C.A.T.`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_STREAM_SELECTION_TEST_QUESTION}>
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
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_STREAM_SELECTION_TEST_QUESTION}>
                        <Button loading={loading} icon="pi pi-arrows-v" />
                    </HasRequiredAuthority>,
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
                        <Fieldset
                            pt={{
                                content: classNames("p-0 mt-1 "),
                            }}
                            legend={<CategoryHead {...item} setCategories={setCategories} setDialogEditCategory={setDialogEditCategory} />}
                        >
                            <Questions {...item} />
                        </Fieldset>
                    )}
                />
            </div>

            {dialogAddCategory?.visible && <DialogAddCategory {...dialogAddCategory} />}
            {dialogEditCategory?.visible && <DialogEditCategory {...dialogEditCategory} closeDialog={closeDialogEditCategory} />}
        </div>
    );
}
