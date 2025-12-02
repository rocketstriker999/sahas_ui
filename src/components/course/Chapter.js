import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import ProgressiveControl from "../common/ProgressiveControl";
import { getReadableDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import IconButton from "../common/IconButton";

export default function Chapter({ id, title, setChapters, type, updatingViewIndex, updated_at, setDialogEditChapter }) {
    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();

    const navigate = useNavigate();

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
                        detail: `Chapter Deleted`,
                        life: 1000,
                    });
                    setChapters((prev) => prev?.filter((chapter) => chapter?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Chapter !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setChapters, showToast]);

    return (
        <div
            onClick={() => {
                if (!updatingViewIndex) navigate(`${id}/media`);
            }}
            className={`flex gap-3 align-items-center border-1 border-gray-300 border-round py-2 px-3 overflow-hidden `}
        >
            <div className="flex flex-column flex-1 gap-2">
                <span className={`text-sm font-semibold `}>
                    {id}. {title}
                </span>
                <div className={`flex align-items-center gap-1 `}>
                    <i className="pi pi-book text-sm"></i>
                    <span className="m-0 p-0 text-xs">{`Last Updated At ${getReadableDate({ date: updated_at })}`}</span>
                </div>
            </div>
            {!!updatingViewIndex && <IconButton icon={"pi-equals"} color={"text-indigo-800"} />}

            {!updatingViewIndex && (
                <ProgressiveControl
                    loading={deleting}
                    control={
                        <IconButton
                            icon={"pi-pencil"}
                            color={"text-orange-500"}
                            onClick={() =>
                                setDialogEditChapter((prev) => ({
                                    ...prev,
                                    visible: true,
                                    setChapters,
                                    id,
                                    title,
                                    type,
                                }))
                            }
                        />
                    }
                />
            )}

            {!updatingViewIndex && (
                <ProgressiveControl loading={deleting} control={<IconButton icon={"pi-trash"} color={"text-red-500"} onClick={deleteChapter} />} />
            )}
        </div>
    );
}
