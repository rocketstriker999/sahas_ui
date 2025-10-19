import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function DialogEditChapter({ visible, closeDialog, setChapters, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [chapter, setChapter] = useState(props);
    const [loading, setLoading] = useState();

    const editChapter = useCallback(() => {
        requestAPI({
            requestPath: `chapters`,
            requestMethod: "PATCH",
            requestPostBody: chapter,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 }),
            onResponseReceieved: (updatedChapter, responseCode) => {
                if (updatedChapter && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Subject Updated", life: 1000 });
                    setChapters((prev) => prev?.map((chapter) => (chapter?.id === updatedChapter.id ? updatedChapter : chapter)));
                    setChapter(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 });
            },
        });
    }, [requestAPI, chapter, showToast, setChapters, closeDialog]);

    return (
        <Dialog header={`Edit Chapter`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Edit Chapter" />

            <FloatLabel className="mt-5">
                <InputText
                    value={chapter?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setChapter((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <Button className="mt-3" label="Edit Subject" severity="warning" loading={loading} onClick={editChapter} />
        </Dialog>
    );
}
