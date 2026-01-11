import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import FileInput from "../common/FileInput";
import { classNames } from "primereact/utils";

export default function DialogEditCoursesContainer({ visible, closeDialog, setCoursesContainers, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [coursesContainer, setCoursesContainer] = useState(props);
    const [loading, setLoading] = useState();

    const editCoursesContainer = useCallback(() => {
        requestAPI({
            requestPath: `courses-containers`,
            requestMethod: "PATCH",
            requestPostBody: coursesContainer,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Course !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedCoursesContainer }, responseCode) => {
                if (updatedCoursesContainer && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Course Updated", life: 1000 });
                    setCoursesContainers((prev) =>
                        prev?.map((coursesContainer) => (coursesContainer?.id === props?.id ? updatedCoursesContainer : coursesContainer))
                    );
                    setCoursesContainer(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Edit Course !", life: 2000 });
            },
        });
    }, [requestAPI, coursesContainer, showToast, setCoursesContainers, closeDialog, props?.id]);

    return (
        <Dialog pt={{ content: classNames("flex flex-column") }} header={`Edit ${props?.title}`} visible={visible} className="w-11" onHide={closeDialog}>
            <div className="flex-1 overflow-scroll">
                <FloatLabel className="mt-2">
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
            </div>

            <Button className="mt-3" label="Edit Course" severity="warning" loading={loading} onClick={editCoursesContainer} />
        </Dialog>
    );
}
