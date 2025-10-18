import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

export default function DialogEditChapterType({ setChapterTypes, visible, closeDialog, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [chapterType, setChapterType] = useState({ requires_enrollment: false, ...props });

    const [loading, setLoading] = useState();

    const editChapterType = useCallback(() => {
        requestAPI({
            requestPath: `chapter-types`,
            requestMethod: "PATCH",
            requestPostBody: chapterType,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Edit Chapter Type !", life: 2000 }),
            onResponseReceieved: (updatedChapterType, responseCode) => {
                if (updatedChapterType && responseCode === 200) {
                    showToast({ severity: "success", summary: "Edited", detail: "Chapter Type Edited", life: 1000 });
                    setChapterTypes((prev) => prev?.map((chapterType) => (chapterType?.id === props.id ? updatedChapterType : chapterType)));
                    setChapterType(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Edit Chapter Type !", life: 2000 });
            },
        });
    }, [chapterType, closeDialog, props.id, requestAPI, setChapterTypes, showToast]);

    return (
        <Dialog header={`Edit Chapters Type`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Edit Existing Chapter Type" />

            <FloatLabel className="mt-5">
                <InputText
                    value={chapterType?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setChapterType((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <div className="text-color-secondary flex align-items-center gap-2 mt-3 border-1 border-gray-300 py-3 px-2 border-round">
                <label className="flex-1" htmlFor="requires_enrollment">
                    Requires Enrollment
                </label>
                <Checkbox
                    className="mr-2"
                    inputId="requires_enrollment"
                    onChange={({ checked }) => setChapterType((prev) => ({ ...prev, requires_enrollment: checked }))}
                    checked={!!chapterType?.requires_enrollment}
                />
            </div>

            <Button className="mt-3" label="Edit Chapter Type" severity="warning" loading={loading} onClick={editChapterType} />
        </Dialog>
    );
}
