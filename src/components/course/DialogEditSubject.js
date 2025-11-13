import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import ColorInput from "../common/ColorInput";

export default function DialogEditSubject({ visible, closeDialog, setSubjects, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [subject, setSubject] = useState(props);
    const [loading, setLoading] = useState();

    const editSubject = useCallback(() => {
        requestAPI({
            requestPath: `subjects`,
            requestMethod: "PATCH",
            requestPostBody: subject,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 }),
            onResponseReceieved: (updatedSubject, responseCode) => {
                if (updatedSubject && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Subject Updated", life: 1000 });
                    setSubjects((prev) => prev?.map((subject) => (subject?.subject_id === props?.id ? { ...subject, ...updatedSubject } : subject)));
                    setSubject(({ course_id }) => ({ course_id })); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 });
            },
        });
    }, [requestAPI, subject, showToast, setSubjects, closeDialog, props?.id]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Subject`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Edit Subject" />

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

            <Button className="mt-3" label="Edit Subject" severity="warning" loading={loading} onClick={editSubject} />
        </Dialog>
    );
}
