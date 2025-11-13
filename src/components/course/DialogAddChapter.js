import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";
import { classNames } from "primereact/utils";

export default function DialogAddChapter({ visible, closeDialog, setChapters, subjectId }) {
    const { requestAPI, showToast } = useAppContext();

    const [chapter, setChapter] = useState({ subject_id: subjectId });
    const [loading, setLoading] = useState();

    const { chapter_types = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const addSubject = useCallback(() => {
        requestAPI({
            requestPath: `chapters`,
            requestMethod: "POST",
            requestPostBody: chapter,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Chapter !", life: 2000 }),
            onResponseReceieved: (chapter, responseCode) => {
                if (chapter && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Chapter Added", life: 1000 });
                    setChapters((prev) => [chapter, ...prev]);
                    setChapter(({ subject_id }) => ({ subject_id })); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Chapter !", life: 2000 });
            },
        });
    }, [requestAPI, chapter, showToast, setChapters, closeDialog]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Chapter`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New Chapter" highlights={["New Chapter Will Be Added"]} />

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

            <Button className="mt-3" label="Add Subject" severity="warning" loading={loading} onClick={addSubject} />
        </Dialog>
    );
}
