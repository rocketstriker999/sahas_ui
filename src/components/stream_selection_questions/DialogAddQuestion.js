import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Chips } from "primereact/chips";
import { classNames } from "primereact/utils";

export default function DialogAddQuestion({ visible, setQuestions, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [streamSelectionQuestion, setStreamSelectionQuestion] = useState({});
    const [loading, setLoading] = useState();

    const addPolicy = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-questions`,
            requestMethod: "POST",
            requestPostBody: streamSelectionQuestion,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Quesiton !", life: 2000 }),
            onResponseReceieved: ({ error, ...question }, responseCode) => {
                if (question && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Quesiton Added", life: 1000 });
                    setQuestions((prev) => [question, ...prev]);
                    setStreamSelectionQuestion({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Quesiton !", life: 2000 });
            },
        });
    }, [closeDialog, requestAPI, setQuestions, showToast, streamSelectionQuestion]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Question`} visible={visible} className="w-11" onHide={closeDialog}>
            <FloatLabel className="mt-5">
                <InputText
                    value={streamSelectionQuestion?.question || ""}
                    id="question"
                    className="w-full"
                    onChange={(e) => setStreamSelectionQuestion((prev) => ({ ...prev, question: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="question">Question</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <Chips
                    pt={{
                        root: classNames("w-full"),
                        container: { className: classNames("w-full") },
                    }}
                    value={streamSelectionQuestion?.options}
                    onChange={(e) => setStreamSelectionQuestion((prev) => ({ ...prev, options: e.value }))}
                />
                <label htmlFor="options">Options</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Question" severity="warning" loading={loading} onClick={addPolicy} />
        </Dialog>
    );
}
