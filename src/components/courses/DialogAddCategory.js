import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import FileInput from "../common/FileInput";

export default function DialogAddCategory({ visible, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [category, setCategory] = useState();
    const [loading, setLoading] = useState();

    const addProductCategory = useCallback(() => {
        requestAPI({
            requestPath: `product-categories`,
            requestMethod: "POST",
            requestPostBody: {},
            setLoading: setLoading,
            onResponseReceieved: (productCategory, responseCode) => {
                if (productCategory && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Category Added", life: 1000 });
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Category !", life: 2000 });
            },
        });
    }, [requestAPI, showToast]);

    return (
        <Dialog header={`Add New Category`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader
                className="pt-3"
                title="Add New Category"
                highlights={["New Products Category Can Be Added", "Products Can Be Added into This Category"]}
            />

            <FloatLabel className="mt-5">
                <InputText
                    value={category?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setCategory((prev) => ({ ...prev, title: e.target.value.toUpperCase() }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <FileInput
                className={"mt-3"}
                label="Product Category"
                type="image"
                file={category?.image}
                setFile={(file) => setCategory((prev) => ({ ...prev, image: file }))}
            />

            <Button className="mt-3" label="Add Category" severity="warning" loading={loading} onClick={addProductCategory} />
        </Dialog>
    );
}
