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

    const addSubject = useCallback(() => {
        requestAPI({
            requestPath: `course-subjects`,
            requestMethod: "PATCH",
            requestPostBody: subject,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 }),
            onResponseReceieved: (updatedSubject, responseCode) => {
                if (updatedSubject && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Course Updated", life: 1000 });
                    setSubjects((prev) => prev?.map((course) => (course?.id === props?.id ? updatedSubject : course)));
                    setSubject(({ course_id }) => ({ course_id })); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Subject !", life: 2000 });
            },
        });
    }, [requestAPI, subject, showToast, setSubjects, closeDialog, props?.id]);

    return (
        <Dialog header={`Add New Subject`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader
                className="pt-3"
                title="Add New Subject"
                highlights={["New Subject Will Be Added", "For Special Subject Background Color Is Required"]}
            />

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
