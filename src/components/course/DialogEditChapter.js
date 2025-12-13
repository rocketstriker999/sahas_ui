import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";
import CheckboxInput from "../common/CheckBoxInput";
import { InputNumber } from "primereact/inputnumber";
import FileInput from "../common/FileInput";
import { TEXT_SIZE_NORMAL } from "../../style";

export default function DialogEditChapter({ visible, closeDialog, setChapters, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [chapter, setChapter] = useState(props);
    const [loading, setLoading] = useState();

    const { chapter_types = [] } = useSelector((state) => state.stateTemplateConfig?.global);

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
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 });
            },
        });
    }, [requestAPI, chapter, showToast, setChapters, closeDialog]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Chapter`} visible={visible} className="w-11" onHide={closeDialog}>
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

            <FloatLabel className="flex-1 mt-5">
                <Dropdown
                    className="w-full"
                    value={chapter_types?.find(({ id }) => id === chapter?.type)}
                    inputId="branch"
                    options={chapter_types}
                    optionLabel="title"
                    onChange={(e) => setChapter((prev) => ({ ...prev, type: e.value?.id }))}
                />
                <label htmlFor="branch">Type</label>
            </FloatLabel>

            <CheckboxInput
                className={"mt-3"}
                label={"Self Assesment"}
                checked={!!chapter?.quiz_attainable}
                onChange={(checked) => setChapter((prev) => ({ ...prev, quiz_attainable: checked }))}
            />

            {!!chapter?.quiz_attainable && (
                <FloatLabel className="mt-5">
                    <InputNumber
                        value={chapter?.quiz_time}
                        id="quiz_time"
                        className="w-full"
                        suffix=" minutes"
                        onChange={(e) => setChapter((prev) => ({ ...prev, quiz_time: e.value }))}
                    />
                    <label htmlFor="quiz_time">Quiz Time</label>
                </FloatLabel>
            )}

            {!!chapter?.quiz_attainable && (
                <FloatLabel className="mt-5">
                    <InputNumber
                        value={chapter?.quiz_questions}
                        id="quiz_questions"
                        className="w-full"
                        onChange={(e) => setChapter((prev) => ({ ...prev, quiz_questions: e.value }))}
                    />
                    <label htmlFor="quiz_questions">Quiz Questions</label>
                </FloatLabel>
            )}

            {!!chapter?.quiz_attainable && (
                <FileInput
                    className={"mt-3"}
                    label="Questions Sheet"
                    type="sheet"
                    cdn_url={chapter?.quiz_pool}
                    setCDNUrl={(cdn_url) => setChapter((prev) => ({ ...prev, quiz_pool: cdn_url }))}
                    disabled={loading}
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                />
            )}

            <Button className="mt-3" label="Edit Subject" severity="warning" loading={loading} onClick={editChapter} />
        </Dialog>
    );
}
