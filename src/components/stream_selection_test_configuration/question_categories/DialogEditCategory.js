import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useAppContext } from "../../../providers/ProviderAppContainer";
import CheckboxInput from "../../common/CheckBoxInput";

export default function DialogEditCategory({ visible, closeDialog, setCategories, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [category, setCategory] = useState(props);
    const [loading, setLoading] = useState();

    const addCategory = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-question-categories`,
            requestMethod: "PUT",
            requestPostBody: category,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Category !", life: 2000 }),
            onResponseReceieved: ({ error, ...category }, responseCode) => {
                if (category && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Category Updated", life: 1000 });
                    setCategories((prev) => prev?.map((p) => (p?.id === props?.id ? category : p)));
                    setCategory({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Update Category !", life: 2000 });
            },
        });
    }, [category, closeDialog, props?.id, requestAPI, setCategories, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Update Category`} visible={visible} className="w-11" onHide={closeDialog}>
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

            <Button className="mt-3" label="Update Category" severity="warning" loading={loading} onClick={addCategory} />
        </Dialog>
    );
}
