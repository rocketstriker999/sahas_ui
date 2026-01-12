import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { ListBox } from "primereact/listbox";
import { InputText } from "primereact/inputtext";
import FileInput from "../common/FileInput";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import CheckboxInput from "../common/CheckBoxInput";
import { useSelector } from "react-redux";

export default function DialogAddCourse({ visible, view_index, closeDialog, setCourses, categoryId }) {
    const { requestAPI, showToast } = useAppContext();

    const [course, setCourse] = useState();
    const [loading, setLoading] = useState();

    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const addCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses`,
            requestMethod: "POST",
            requestPostBody: { ...course, category_id: categoryId, view_index },
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Course !", life: 2000 }),
            onResponseReceieved: ({ error, ...addedCourse }, responseCode) => {
                if (addedCourse && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Course Added", life: 1000 });
                    setCourses((prev) => [addedCourse, ...prev]);
                    setCourse(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Course !", life: 2000 });
            },
        });
    }, [requestAPI, course, categoryId, view_index, showToast, setCourses, closeDialog]);

    return (
        <Dialog pt={{ content: { className: " flex flex-column" } }} header={`Add New Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <div className="flex-1 overflow-scroll">
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

                <CheckboxInput
                    className={"mt-3"}
                    label={"Combo Course"}
                    checked={!!course?.is_bundle}
                    onChange={(checked) => setCourse((prev) => ({ ...prev, is_bundle: checked }))}
                />

                {!course?.is_bundle && (
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
                )}

                {!!course?.is_bundle && (
                    <ListBox
                        filter
                        multiple
                        onChange={(e) => setCourse((prev) => ({ ...prev, bundledCourses: e.value }))}
                        value={course?.bundledCourses}
                        options={courses?.filter(({ id }) => id != course?.id)}
                        className="mt-4 "
                        listStyle={{ maxHeight: "128px" }}
                        itemTemplate={(option) => (
                            <span className="font-semibold">
                                {option?.title} ({option?.fees} ₹.)
                            </span>
                        )}
                    />
                )}
            </div>

            <Button className="mt-3" label="Add Course" severity="warning" loading={loading} onClick={addCourse} />
        </Dialog>
    );
}
