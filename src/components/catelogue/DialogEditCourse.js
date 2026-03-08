import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import FileInput from "../common/FileInput";
import { classNames } from "primereact/utils";
import CheckboxInput from "../common/CheckBoxInput";
import { ListBox } from "primereact/listbox";
import { useSelector } from "react-redux";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function DialogEditCourse({ visible, closeDialog, setCourses, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [course, setCourse] = useState(props);
    const [loading, setLoading] = useState();

    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const editCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses`,
            requestMethod: "PATCH",
            requestPostBody: course,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Course !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedCourse }, responseCode) => {
                if (updatedCourse && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Course Updated", life: 1000 });
                    setCourses((prev) => prev?.map((course) => (course?.id === props?.id ? updatedCourse : course)));
                    setCourse(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Edit Course !", life: 2000 });
            },
        });
    }, [requestAPI, course, showToast, setCourses, closeDialog, props?.id]);

    return (
        <Dialog pt={{ content: classNames("flex flex-column") }} header={`Edit ${props?.title}`} visible={visible} className="w-11" onHide={closeDialog}>
            <div className="flex-1 overflow-scroll">
                <FloatLabel className="mt-2">
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

                <CheckboxInput
                    className={"mt-3"}
                    label={"Combo Course"}
                    checked={!!course?.is_bundle}
                    onChange={(checked) => setCourse((prev) => ({ ...prev, is_bundle: checked }))}
                />

                {!!course?.is_bundle && (
                    <ListBox
                        filter
                        multiple
                        onChange={(e) => setCourse((prev) => ({ ...prev, bundledCourses: e.value }))}
                        value={course?.bundledCourses}
                        options={courses?.filter(({ id }) => id != course?.id)?.filter(({ is_bundle }) => !is_bundle)}
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

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_COURSE}>
                <Button className="mt-3" label="Edit Course" severity="warning" loading={loading} onClick={editCourse} />
            </HasRequiredAuthority>
        </Dialog>
    );
}
