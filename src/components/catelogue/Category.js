import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import ProgressiveControl from "../common/ProgressiveControl";
import { useNavigate, useOutletContext } from "react-router-dom";
import IconButton from "../common/IconButton";

export default function Category({ id, image, title, courses_count, updatingViewIndex }) {
    const { requestAPI, showToast } = useAppContext();
    const { setCategories } = useOutletContext();

    const [deleting, setDeleting] = useState();

    const navigate = useNavigate();

    const deleteCategory = useCallback(() => {
        requestAPI({
            requestPath: `course-categories/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Category Deleted", life: 1000 });
                    setCategories((prev) => prev?.filter((category) => category?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete File !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setCategories, showToast]);

    return (
        <div
            onClick={() => {
                if (!updatingViewIndex) navigate(`${id}/courses`);
            }}
            className="w-full flex gap-2 align-items-center border-1 border-gray-300 border-round pr-2"
        >
            <img className="border-round-left w-8rem h-4rem" src={image} alt={title} />
            <div className="flex flex-column flex-1 gap-1">
                <span className="text-sm font-semibold word-break-all">{title}</span>
                <div className="flex align-items-center gap-1 text-orange-800">
                    <i className="pi pi-book text-sm"></i>
                    <span className="m-0 p-0 text-xs">{`${courses_count} Courses`}</span>
                </div>
            </div>
            {!!updatingViewIndex && <i className="pi pi-equals"></i>}
            {!updatingViewIndex && (
                <ProgressiveControl loading={deleting} control={<IconButton icon={"pi-trash"} color={"text-red-500"} onClick={deleteCategory} />} />
            )}
            {!updatingViewIndex && <IconButton icon={"pi-arrow-circle-right"} />}
        </div>
    );
}
