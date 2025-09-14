import Detail from "../common/Detail";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { removeAuthority } from "../../redux/sliceTemplateConfig";
import ProgressiveControl from "../common/ProgressiveControl";

export default function Authority({ id, created_on, title, description }) {
    const { requestAPI, showToast } = useAppContext();
    const [deleting, setDeleting] = useState();
    const dispatch = useDispatch();

    const deleteAuthority = useCallback(() => {
        requestAPI({
            requestPath: `authorities/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Authority Deleted", life: 1000 });
                    dispatch(removeAuthority(id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Authority !", life: 2000 });
                }
            },
        });
    }, [dispatch, id, requestAPI, showToast]);

    return (
        <div className="flex align-items-center gap-1">
            <Detail className={"flex-1"} icon="pi pi-angle-right" title={`Created At ${created_on}`} value={title} more={description} />

            <ProgressiveControl
                loading={deleting}
                control={<Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={deleteAuthority} />}
            />
        </div>
    );
}
