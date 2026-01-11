import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import FileInput from "../common/FileInput";
import { InputNumber } from "primereact/inputnumber";

export default function DialogAddCoursesContainer({ visible, view_index, closeDialog, setCoursesContainers, categoryId }) {
    const { requestAPI, showToast } = useAppContext();

    const [coursesContainer, setCoursesContainer] = useState();
    const [loading, setLoading] = useState();

    const addCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses-containers`,
            requestMethod: "POST",
            requestPostBody: { ...coursesContainer, category_id: categoryId, view_index },
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Courses Container !", life: 2000 }),
            onResponseReceieved: ({ error, ...addedCoursesContainer }, responseCode) => {
                if (addedCoursesContainer && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Courses Container Added", life: 1000 });
                    setCoursesContainers((prev) => [addedCoursesContainer, ...prev]);
                    setCoursesContainer(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Courses Container !", life: 2000 });
            },
        });
    }, [requestAPI, coursesContainer, categoryId, view_index, showToast, setCoursesContainers, closeDialog]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader
                className="pt-3"
                title="Add New Courses Container"
                highlights={["New Courses Container Will Be Added", "Courses Can Be Added into Courses Container"]}
            />

            <FloatLabel className="mt-5">
                <InputText
                    value={coursesContainer?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setCoursesContainer((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputNumber
                    value={coursesContainer?.fees}
                    id="fees"
                    className="w-full"
                    onChange={(e) => setCoursesContainer((prev) => ({ ...prev, fees: e.value }))}
                />
                <label htmlFor="fees">Total Fees</label>
            </FloatLabel>

            <FileInput
                className="mt-3"
                label="Course"
                type="image"
                cdn_url={coursesContainer?.image}
                setCDNUrl={(cdn_url) => setCoursesContainer((prev) => ({ ...prev, image: cdn_url }))}
                disabled={loading}
            />

            <Button className="mt-3" label="Add Course" severity="warning" loading={loading} onClick={addCourse} />
        </Dialog>
    );
}
