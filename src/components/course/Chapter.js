import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import ProgressiveControl from "../common/ProgressiveControl";
import { getReadableDate } from "../../utils";

export default function Chapter({ id, title, setChapterTypes, requires_enrollment, updatingViewIndex, updated_at }) {
    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();

    const [dialogEditChapterType, setDialogEditChapterType] = useState({
        visible: false,
    });

    const closeDialogEditChapterType = useCallback(() => {
        setDialogEditChapterType((prev) => ({ ...prev, visible: false }));
    }, []);

    const deleteChapter = useCallback(() => {
        requestAPI({
            requestPath: `chapters/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({
                        severity: "success",
                        summary: "Deleted",
                        detail: `Chapter Type Deleted`,
                        life: 1000,
                    });
                    setChapterTypes((prev) => prev?.filter((chapterType) => chapterType?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Chapter Type !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setChapterTypes, showToast]);

    return (
        <div className={`flex gap-3 align-items-center border-1 border-gray-300 border-round py-2 px-3 overflow-hidden `}>
            <div className="flex flex-column flex-1 gap-2">
                <span className={`text-sm font-semibold `}>
                    {id}. {title}
                </span>
                <div className={`flex align-items-center gap-1 `}>
                    <i className="pi pi-book text-sm"></i>
                    <span className="m-0 p-0 text-xs">{`Last Updated At ${getReadableDate({ date: updated_at })}`}</span>
                </div>
            </div>
            {!!updatingViewIndex && <i className={`pi pi-equals `}></i>}
            {!updatingViewIndex && (
                <i
                    className={`pi pi-pencil `}
                    onClick={() =>
                        setDialogEditChapterType((prev) => ({
                            ...prev,
                            visible: true,
                            setChapterTypes,
                            id,
                            title,
                            requires_enrollment,
                            closeDialog: closeDialogEditChapterType,
                        }))
                    }
                ></i>
            )}
            {!updatingViewIndex && <ProgressiveControl loading={deleting} control={<i className={`pi pi-trash `} onClick={deleteChapter}></i>} />}
            {/* {dialogEditChapterType?.visible && <DialogEditChapterType {...dialogEditChapterType} />} */}
        </div>
    );
}
