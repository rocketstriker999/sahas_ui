import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import FileInput from "../common/FileInput";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";

export default function DialogAddCourse({ visible, view_index, closeDialog, setCoursesContainers, coursesContainerId, coursesContainerTitle }) {
    const { requestAPI, showToast } = useAppContext();

    const [course, setCourse] = useState();
    const [loading, setLoading] = useState();

    const addCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses`,
            requestMethod: "POST",
            requestPostBody: { ...course, courses_container_id: coursesContainerId, view_index },
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Course !", life: 2000 }),
            onResponseReceieved: ({ error, ...addedCourse }, responseCode) => {
                if (addedCourse && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Course Added", life: 1000 });
                    setCoursesContainers((prev) =>
                        prev?.map((coursesContainer) => {
                            if (coursesContainer?.id === coursesContainerId) {
                                coursesContainer.courses = [addedCourse, ...coursesContainer.courses];
                            }
                            return coursesContainer;
                        })
                    );
                    setCourse(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Course !", life: 2000 });
            },
        });
    }, [requestAPI, course, coursesContainerId, view_index, showToast, setCoursesContainers, closeDialog]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title={`Add New Course to ${coursesContainerTitle}`} highlights={["New Course Will Be Added"]} />

            <FloatLabel className="mt-5">
                <InputText
                    value={course?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setCourse((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputTextarea
                    value={course?.description || ""}
                    id="description"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setCourse((prev) => ({ ...prev, description: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="description">Description</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputText
                    value={course?.whatsapp_group || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setCourse((prev) => ({ ...prev, whatsapp_group: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Whatsapp Group</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Course" severity="warning" loading={loading} onClick={addCourse} />
        </Dialog>
    );
}
