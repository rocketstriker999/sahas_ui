import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import ProgressiveControl from "../common/ProgressiveControl";
import { useNavigate } from "react-router-dom";
import { getReadableDate } from "../../utils";
import DialogEditSubject from "./DialogEditSubject";

export default function Subject({ id, title, subject_id, setSubjects, background_color, updatingViewIndex, updated_at, setDialogEditSubject }) {
    const navigate = useNavigate();

    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();

    const deleteSubject = useCallback(() => {
        requestAPI({
            requestPath: `course-subjects/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({
                        severity: "success",
                        summary: "Deleted",
                        detail: `Subject Deleted`,
                        life: 1000,
                    });
                    setSubjects((prev) => prev?.filter((course) => course?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Subject !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setSubjects, showToast]);

    return (
        <div
            style={{ backgroundColor: background_color }}
            className="flex gap-3 align-items-center border-1 border-gray-300 border-round py-2 px-3 overflow-hidden"
        >
            <div
                className="flex flex-column flex-1 gap-2"
                onClick={() => {
                    if (!updatingViewIndex) navigate(`${subject_id}/chapters`);
                }}
            >
                <span className={`text-sm font-semibold ${background_color && "text-white"}`}>
                    {subject_id}. {title}
                </span>
                <div className={`flex align-items-center gap-1 text-orange-800 ${background_color && "text-white"}`}>
                    <i className="pi pi-book text-sm"></i>
                    <span className="m-0 p-0 text-xs">{`Last Updated At ${getReadableDate({ date: updated_at })}`}</span>
                </div>
            </div>
            {!!updatingViewIndex && <i className={`pi pi-equals ${background_color && "text-white"}`}></i>}
            {!updatingViewIndex && (
                <i
                    className={`pi pi-pencil ${background_color && "text-white"}`}
                    onClick={() =>
                        setDialogEditSubject((prev) => ({
                            ...prev,
                            visible: true,
                            setSubjects,
                            id: subject_id,
                            title,
                            background_color,
                        }))
                    }
                ></i>
            )}
            {!updatingViewIndex && (
                <ProgressiveControl
                    loading={deleting}
                    control={<i className={`pi pi-trash ${background_color && "text-white"}`} onClick={deleteSubject}></i>}
                />
            )}
            {!updatingViewIndex && <i className={`pi pi-arrow-circle-right ${background_color && "text-white"}`}></i>}
        </div>
    );
}
