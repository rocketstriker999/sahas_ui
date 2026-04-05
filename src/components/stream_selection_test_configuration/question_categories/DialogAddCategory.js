import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useAppContext } from "../../../providers/ProviderAppContainer";
import CheckboxInput from "../../common/CheckBoxInput";

export default function DialogAddCategory({ visible, setCategories, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [category, setCategory] = useState({ active: false });
    const [loading, setLoading] = useState();

    const addCategory = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-question-categories`,
            requestMethod: "POST",
            requestPostBody: category,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Category !", life: 2000 }),
            onResponseReceieved: ({ error, ...category }, responseCode) => {
                if (category && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Category Added", life: 1000 });
                    setCategories((prev) => [category, ...prev]);
                    setCategory({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Category !", life: 2000 });
            },
        });
    }, [category, closeDialog, requestAPI, setCategories, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Category`} visible={visible} className="w-11" onHide={closeDialog}>
            <FloatLabel className="mt-5">
                <InputText
                    value={category?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setCategory((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <CheckboxInput
                className={"mt-3"}
                label={"Active"}
                checked={!!category?.active}
                onChange={(checked) => setCategory((prev) => ({ ...prev, active: checked }))}
            />

            <Button className="mt-3" label="Add Category" severity="warning" loading={loading} onClick={addCategory} />
        </Dialog>
    );
}
