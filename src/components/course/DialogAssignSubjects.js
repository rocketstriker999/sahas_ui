import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { ListBox } from "primereact/listbox";

export default function DialogAssignSubjects({ visible, closeDialog, courseSubjects, setCourseSubjects, courseId }) {
    const { requestAPI, showToast } = useAppContext();

    const [availableSubjects, setAvailableSubject] = useState();
    const [selectedSubjects, setSelectedSubjects] = useState();

    const [loading, setLoading] = useState();

    useEffect(() => {
        if (!availableSubjects)
            requestAPI({
                requestPath: `subjects`,
                requestMethod: "GET",
                setLoading: setLoading,
                onResponseReceieved: (subjects, responseCode) => {
                    if (subjects && responseCode === 200) {
                        setAvailableSubject(() => subjects.filter(({ id }) => !courseSubjects?.find(({ subject_id }) => subject_id === id)));
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Subjects !", life: 2000 });
                    }
                },
            });
    }, [availableSubjects, courseId, courseSubjects, requestAPI, showToast]);

    const addSubjects = useCallback(() => {
        requestAPI({
            requestPath: `course-subjects`,
            requestMethod: "POST",
            requestPostBody: { course_id: courseId, subjects: selectedSubjects },
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Assign Subjects !", life: 2000 }),
            onResponseReceieved: (subjects, responseCode) => {
                if (subjects && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Subjects Assigned", life: 1000 });
                    setCourseSubjects(() => subjects);
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Assign Subjects !", life: 2000 });
            },
        });
    }, [closeDialog, courseId, requestAPI, selectedSubjects, setCourseSubjects, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Assign Subjects`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New Subject" highlights={["New Subject Can Be Mapped Here", "Subjects Can Be Unmapped From List"]} />

            <ListBox
                filter
                multiple
                value={selectedSubjects}
                onChange={(e) => setSelectedSubjects(e.value)}
                options={availableSubjects}
                className="mt-4 "
                listStyle={{ maxHeight: "250px" }}
                itemTemplate={(option) => (
                    <span className="font-semibold">
                        {option?.id}. {option?.title}
                    </span>
                )}
            />
            <Button className="mt-3" label="Add Subjects" severity="warning" disabled={!selectedSubjects?.length} loading={loading} onClick={addSubjects} />
        </Dialog>
    );
}
