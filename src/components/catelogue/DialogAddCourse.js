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

export default function DialogAddCourse({ visible, closeDialog, setCourses, categoryId }) {
    const { requestAPI, showToast } = useAppContext();

    const [course, setCourse] = useState({ category_id: categoryId });
    const [loading, setLoading] = useState();

    const addCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses`,
            requestMethod: "POST",
            requestPostBody: course,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Course !", life: 2000 }),
            onResponseReceieved: (course, responseCode) => {
                if (course && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Course Added", life: 1000 });

                    setCourses((prev) => [course, ...prev]);
                    setCourse(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Course !", life: 2000 });
            },
        });
    }, [course, closeDialog, requestAPI, setCourses, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New Course" highlights={["New Course Will Be Added", "Subjects Of Courses Can Be Managed"]} />

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
                <InputNumber value={course?.fees} id="fees" className="w-full" onChange={(e) => setCourse((prev) => ({ ...prev, fees: e.value }))} />
                <label htmlFor="fees">Total Fees</label>
            </FloatLabel>

            <FileInput
                className="mt-3"
                label="Course"
                type="image"
                cdn_url={course?.image}
                setCDNUrl={(cdn_url) => setCourse((prev) => ({ ...prev, image: cdn_url }))}
                disabled={loading}
            />

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
