import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import ProgressiveControl from "../common/ProgressiveControl";
import DialogEditCourse from "./DialogEditCourse";
import { useNavigate } from "react-router-dom";

export default function Course({ id, title, description, fees, image, whatsapp_group, setCourses, updatingViewIndex }) {
    const navigate = useNavigate();

    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();

    const [dialogEditCourse, setDialogEditCourse] = useState({
        visible: false,
    });

    const closeDialogEditCourse = useCallback(() => {
        setDialogEditCourse((prev) => ({ ...prev, visible: false }));
    }, []);

    const deleteCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,

            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({
                        severity: "success",
                        summary: "Deleted",
                        detail: `Course Deleted`,
                        life: 1000,
                    });
                    setCourses((prev) => prev?.filter((course) => course?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Course !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setCourses, showToast]);

    return (
        <div className="border-1 border-gray-300 border-round  flex flex-column gap-2 overflow-hidden pb-2">
            <img
                onClick={() => {
                    if (!updatingViewIndex) navigate(`/courses/${id}/subjects`);
                }}
                className="w-full"
                src={image}
                alt={title}
            />

            <div className="flex align-items-center  px-2 gap-3">
                <span className="text-sm font-semibold text-indigo-800 flex-1">
                    <i className="pi text-xs pi-info-circle"></i> {title}
                </span>

                {!updatingViewIndex && (
                    <i
                        className={`pi pi-pencil`}
                        onClick={() =>
                            setDialogEditCourse((prev) => ({
                                ...prev,
                                visible: true,
                                setCourses,
                                closeDialog: closeDialogEditCourse,
                                id,
                                title,
                                description,
                                fees,
                                image,
                                whatsapp_group,
                            }))
                        }
                    ></i>
                )}
                {!updatingViewIndex && <ProgressiveControl loading={deleting} control={<i className={`pi pi-trash `} onClick={deleteCourse}></i>} />}
                {!!updatingViewIndex && <i className="pi pi-equals mr-3"></i>}
            </div>

            <span className="text-xs px-2">{description}</span>

            {dialogEditCourse?.visible && <DialogEditCourse {...dialogEditCourse} />}
        </div>
    );
}
