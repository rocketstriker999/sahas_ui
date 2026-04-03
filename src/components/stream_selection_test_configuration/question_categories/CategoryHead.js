import { useCallback, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../../style";
import { getReadableDate } from "../../../utils";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";
import ProgressiveControl from "../../common/ProgressiveControl";
import { Button } from "primereact/button";

export default function CategoryHead({ id, title, updated_at, active, setCategories, setDialogEditCategory }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const deleteCategory = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-question-categories/${id}`,
            requestMethod: "DELETE",
            setLoading,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Category Deleted", life: 1000 });
                    setCategories((prev) => prev?.filter((category) => category?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Category !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setCategories, showToast]);

    return (
        <div className="flex align-items-center">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <p className={`m-0 p-0 ${TEXT_SIZE_NORMAL}`}>
                    {id}. {title}
                </p>
                {updated_at && (
                    <p className={`${TEXT_SIZE_SMALL} m-0 p-0 font-medium text-color-secondary`}>
                        <i className={`${TEXT_SIZE_SMALL} pi pi-calendar`}></i> Updated at {getReadableDate({ date: updated_at })}
                    </p>
                )}
            </div>
            <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_STREAM_SELECTION_QUESTION_CATEGORY}>
                <ProgressiveControl
                    loading={loading}
                    control={
                        <Button
                            className="w-2rem h-2rem mx-2"
                            icon="pi pi-pencil"
                            rounded
                            severity="warning"
                            onClick={() =>
                                setDialogEditCategory((prev) => ({
                                    ...prev,
                                    visible: true,
                                    setCategories,
                                    id,
                                    title,
                                    active,
                                }))
                            }
                        />
                    }
                />
            </HasRequiredAuthority>

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.DELETE_STREAM_SELECTION_QUESTION_CATEGORY}>
                <ProgressiveControl
                    loading={loading}
                    control={<Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={deleteCategory} />}
                />
            </HasRequiredAuthority>
        </div>
    );
}
