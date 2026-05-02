import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import FileInput from "../../common/FileInput";
import { useDispatch } from "react-redux";
import { addStreamSelectionSuggestion } from "../../../redux/sliceTemplateConfig";

export default function DialogAddSuggestion({ visible, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [suggestion, setSuggestion] = useState({});

    const dispatch = useDispatch();

    const addSuggestion = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-suggestions`,
            requestMethod: "POST",
            requestPostBody: suggestion,
            setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Suggestion !", life: 2000 }),
            onResponseReceieved: ({ error, ...addedSuggestion }, responseCode) => {
                if (addedSuggestion?.id && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Suggestion Added", life: 1000 });
                    dispatch(addStreamSelectionSuggestion(addedSuggestion))
                    setSuggestion({});
                    closeDialog();
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Suggestion !", life: 2000 });
                }
            },
        });
    }, [closeDialog, requestAPI, showToast, suggestion,dispatch]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Suggestion`} visible={visible} className="w-11" onHide={closeDialog}>
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
            <Button className="mt-3" label="Add Suggestion" severity="warning" loading={loading} onClick={addSuggestion} />
        </Dialog>
    );
}
