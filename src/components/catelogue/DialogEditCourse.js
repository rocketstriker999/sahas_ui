import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import FileInput from "../common/FileInput";

export default function DialogEditCourse({ visible, closeDialog, setCourses, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    console.log(props);

    const [course, setCourse] = useState(props);
    const [loading, setLoading] = useState();

    const editCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses`,
            requestMethod: "PATCH",
            requestPostBody: course,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Course !", life: 2000 }),
            onResponseReceieved: (updatedCourse, responseCode) => {
                if (updatedCourse && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Course Updated", life: 1000 });
                    setCourses((prev) => prev?.map((course) => (course?.id === props?.id ? updatedCourse : course)));
                    setCourse(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Course !", life: 2000 });
            },
        });
    }, [requestAPI, course, showToast, setCourses, closeDialog, props?.id]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title={props?.title} />
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

            <Button className="mt-3" label="Edit Course" severity="warning" loading={loading} onClick={editCourse} />
        </Dialog>
    );
}
