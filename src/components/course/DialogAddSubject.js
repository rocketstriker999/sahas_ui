import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import ColorInput from "../common/ColorInput";

export default function DialogAddSubject({ visible, view_index, closeDialog, setSubjects, courseId }) {
    const { requestAPI, showToast } = useAppContext();

    const [subject, setSubject] = useState();
    const [loading, setLoading] = useState();

    const addSubject = useCallback(() => {
        requestAPI({
            requestPath: `subjects`,
            requestMethod: "POST",
            requestPostBody: { ...subject, course_id: courseId, view_index },
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Subject !", life: 2000 }),
            onResponseReceieved: ({ error, ...addedSubject }, responseCode) => {
                if (addedSubject && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Subject Added", life: 1000 });
                    setSubjects((prev) => [addedSubject, ...prev]);
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Subject !", life: 2000 });
            },
        });
    }, [closeDialog, courseId, requestAPI, setSubjects, showToast, subject, view_index]);

    return (
        <Dialog header={`Add New Subject`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New Subject" highlights={["For Special Subject Background Color Is Required"]} />

            <FloatLabel className="mt-5">
                <InputText
                    value={subject?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setSubject((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <ColorInput
                className={"mt-3"}
                color={subject?.background_color}
                setColor={(color) => setSubject((prev) => ({ ...prev, background_color: color }))}
            />

            <Button className="mt-3" label="Add Subject" severity="warning" loading={loading} onClick={addSubject} />
        </Dialog>
    );
}
