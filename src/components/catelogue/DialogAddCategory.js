import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import FileInput from "../common/FileInput";
import { useOutletContext } from "react-router-dom";
import { TEXT_SIZE_NORMAL, TITLE_TEXT } from "../../style";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function DialogAddCategory({ visible, view_index, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();
    const { setCategories } = useOutletContext();

    const [category, setCategory] = useState();
    const [loading, setLoading] = useState();

    const addProductCategory = useCallback(() => {
        requestAPI({
            requestPath: `course-categories`,
            requestMethod: "POST",
            requestPostBody: { ...category, view_index },
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Category !", life: 2000 }),
            onResponseReceieved: ({ error, ...addedCategory }, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Category Added", life: 1000 });
                    setCategories((prev) => [addedCategory, ...prev]);
                    setCategory(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Category !", life: 2000 });
            },
        });
    }, [category, closeDialog, requestAPI, setCategories, showToast, view_index]);

    return (
        <Dialog
            header={`Add New Category`}
            visible={visible}
            className="w-11"
            onHide={closeDialog}
            pt={{
                headertitle: { className: TITLE_TEXT },
                content: { className: "overflow-visible" },
            }}
        >
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
                    onChange={(e) => setCategory((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                />
                <label htmlFor="title" className={`${TEXT_SIZE_NORMAL}`}>
                    Title
                </label>
            </FloatLabel>

            <FileInput
                className={"mt-3"}
                label="Product Category"
                type="image"
                cdn_url={category?.image}
                setCDNUrl={(cdn_url) => setCategory((prev) => ({ ...prev, image: cdn_url }))}
                disabled={loading}
                pt={{
                    root: { className: TEXT_SIZE_NORMAL },
                }}
            />

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_COURSE_CATEGORY}>
                <Button
                    className="mt-3"
                    label="Add Category"
                    severity="warning"
                    loading={loading}
                    onClick={addProductCategory}
                    pt={{
                        label: { className: TEXT_SIZE_NORMAL },
                    }}
                />
            </HasRequiredAuthority>
        </Dialog>
    );
}
