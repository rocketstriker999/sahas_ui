import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import { Chips } from "primereact/chips";
import { classNames } from "primereact/utils";
import FileInput from "../../common/FileInput";
import { TEXT_NORMAL } from "../../../style";

export default function DialogEditQuestion({ visible, setQuestions, closeDialog, ...props }) {
    const { requestAPI, showToast } = useAppContext();
    const [streamSelectionQuestion, setStreamSelectionQuestion] = useState(props);
    const [loading, setLoading] = useState();

    const editStreamSelectionQuestion = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-questions`,
            requestMethod: "PUT",
            requestPostBody: streamSelectionQuestion,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Question !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedQuestion }, responseCode) => {
                if (updatedQuestion && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Question Updated", life: 1000 });
                    setQuestions((prev) => prev?.map((p) => (p?.id === props?.id ? updatedQuestion : p)));
                    setStreamSelectionQuestion({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Update Question !", life: 2000 });
            },
        });
    }, [closeDialog, props?.id, requestAPI, setQuestions, showToast, streamSelectionQuestion]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Question`} visible={visible} className="w-11" onHide={closeDialog}>
            <FileInput
                className={"mt-3"}
                label="Question Image"
                type="image"
                cdn_url={streamSelectionQuestion?.media_url}
                setCDNUrl={(cdn_url) => setStreamSelectionQuestion((prev) => ({ ...prev, media_url: cdn_url }))}
                disabled={loading}
                source_accessible={false}
                pt={{
                    root: { className: TEXT_NORMAL },
                }}
            />
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

            <Button className="mt-3" label="Edit Question" severity="warning" loading={loading} onClick={editStreamSelectionQuestion} />
        </Dialog>
    );
}
