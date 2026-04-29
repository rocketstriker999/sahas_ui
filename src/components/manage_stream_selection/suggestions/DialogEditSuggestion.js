import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import FileInput from "../../common/FileInput";

export default function DialogEditSuggestion({ visible, closeDialog, setSuggestions, ...props }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [suggestion, setSuggestion] = useState(props);

    const editSuggestion = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-suggestions`,
            requestMethod: "PATCH",
            requestPostBody: suggestion,
            setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Edit Suggestion !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedSuggestion }, responseCode) => {
                if (updatedSuggestion?.id && responseCode === 200) {
                    showToast({ severity: "success", summary: "Edited", detail: "Suggestion Edited", life: 1000 });
                    setSuggestions((prev) =>
                        prev?.map((existingSuggestion) => (existingSuggestion?.id === props?.id ? updatedSuggestion : existingSuggestion))
                    );
                    closeDialog();
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Edit Suggestion !", life: 2000 });
                }
            },
        });
    }, [closeDialog, props?.id, requestAPI, setSuggestions, showToast, suggestion]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Suggestion`} visible={visible} className="w-11" onHide={closeDialog}>
            <FloatLabel className="mt-5">
                <InputText
                    value={suggestion?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setSuggestion((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>
            <FileInput
                className={"mt-3"}
                label="Suggestion PDF"
                type="pdf"
                cdn_url={suggestion?.pdf}
                setCDNUrl={(pdf) => setSuggestion((prev) => ({ ...prev, pdf }))}
                disabled={loading}
            />
            <Button className="mt-3" label="Edit Suggestion" severity="warning" loading={loading} onClick={editSuggestion} />
        </Dialog>
    );
}
