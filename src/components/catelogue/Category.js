import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import ProgressiveControl from "../common/ProgressiveControl";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SUB_TITLE_TEXT, TEXT_SIZE_SMALL, TEXT_SIZE_NORMAL, TITLE_TEXT, ICON_SIZE } from "../../style";

export default function Category({ id, image, title, courses_count, updatingViewIndex }) {
    const { requestAPI, showToast } = useAppContext();
    const { setCategories } = useOutletContext();

    const [deleting, setDeleting] = useState();

    const navigate = useNavigate();

    const deleteProductCategory = useCallback(() => {
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
        <ProgressiveControl
            loading={deleting}
            control={
                <div className="flex gap-2 align-items-center border-1 border-gray-300 border-round ">
                    <img className="border-round-left" src={image} alt={title} />
                    <div
                        className="flex flex-column flex-1 gap-2"
                        onClick={() => {
                            if (!updatingViewIndex) navigate(`${id}/courses`);
                        }}
                    >
                        <span className={`${TEXT_SIZE_SMALL} font-semibold`}>{title}</span>
                        <div className="flex align-items-center gap-2 text-orange-800">
                            <i className={`pi pi-book ${TEXT_SIZE_SMALL}`} ></i>
                            <span className={`m-0 p-0  ${TEXT_SIZE_SMALL}`}>{`${courses_count} Courses`}</span>
                        </div>
                    </div>
                    {!!updatingViewIndex && <i className={`pi pi-equals mr-3 ${ICON_SIZE}`}></i>}
                    {!updatingViewIndex && <i className={`pi pi-trash mr-3 ${ICON_SIZE}`} onClick={deleteProductCategory}></i>}
                    {!updatingViewIndex && <i className={`pi pi-arrow-circle-right mr-3 ${ICON_SIZE}`}></i>}
                </div>
            }
        />
    );
}
