import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function DialogEditQuizConfig({ visible, closeDialog, subject, setSubject }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const editQuizConfiguration = useCallback(() => {
        requestAPI({
            requestPath: `subjects`,
            requestMethod: "PATCH",
            requestPostBody: subject,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 }),
            onResponseReceieved: (updatedSubject, responseCode) => {
                if (updatedSubject && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Subject Updated", life: 1000 });
                    //setSubjects((prev) => prev?.map((subject) => (subject?.subject_id === props?.id ? { ...subject, ...updatedSubject } : subject)));
                    setSubject(({ course_id }) => ({ course_id })); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 });
            },
        });
    }, [requestAPI, subject, showToast, setSubject, closeDialog]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Quiz Configuration`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Edit Quiz Configuration" />

            <FloatLabel className="mt-5">
                <InputText
                    value={subject?.quiz_batch_size || ""}
                    id="quiz_batch_size"
                    className="w-full"
                    onChange={(e) => setSubject((prev) => ({ ...prev, quiz_batch_size: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="quiz_batch_size">MCQ Batch Size</label>
            </FloatLabel>

            <Button className="mt-3" label="Edit Quiz Configuration" severity="warning" loading={loading} onClick={editQuizConfiguration} />
        </Dialog>
    );
}
