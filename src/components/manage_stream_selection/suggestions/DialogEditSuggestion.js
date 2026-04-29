import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import FileInput from "../../common/FileInput";
import { useDispatch } from "react-redux";
import { editStreamSelectionSuggestion } from "../../../redux/sliceTemplateConfig";

export default function DialogEditSuggestion({ visible, closeDialog, ...props }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [suggestion, setSuggestion] = useState(props);
    const dispatch = useDispatch();

    const editSuggestion = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-suggestions`,
            requestMethod: "PUT",
            requestPostBody: suggestion,
            setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Edit Suggestion !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedSuggestion }, responseCode) => {
                if (updatedSuggestion?.id && responseCode === 200) {
                    showToast({ severity: "success", summary: "Edited", detail: "Suggestion Edited", life: 1000 });
                    dispatch(editStreamSelectionSuggestion(updatedSuggestion));
                    closeDialog();
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Edit Suggestion !", life: 2000 });
                }
            },
        });
    }, [closeDialog, dispatch, requestAPI, showToast, suggestion]);

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
