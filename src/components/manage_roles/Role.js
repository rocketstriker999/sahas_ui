import Detail from "../common/Detail";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import { Button } from "primereact/button";
import Loading from "../common/Loading";
import { useDispatch } from "react-redux";
import { removeRole } from "../../redux/sliceTemplateConfig";
import DialogManageRoleAuthorities from "./DialogManageRoleAuthority";

export default function Role({ id, created_on, title, description }) {
    const { requestAPI, showToast } = useAppContext();
    const [deleting, setDeleting] = useState();
    const [managingRoleAuthorities, setManagingRoleAuthorities] = useState();

    const dispatch = useDispatch();

    const deleteRole = useCallback(() => {
        requestAPI({
            requestPath: `roles/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Role Deleted", life: 1000 });
                    dispatch(removeRole(id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Role !", life: 2000 });
                }
            },
        });
    }, [dispatch, id, requestAPI, showToast]);

    return (
        <div className="flex alig-items-center gap-1">
            <Detail className={"flex-1"} icon="pi pi-angle-right" title={`Created At ${created_on}`} value={title} more={description} />
            <Button className="w-2rem h-2rem" icon="pi pi-list-check" rounded onClick={() => setManagingRoleAuthorities(id)} />
            {deleting ? <Loading /> : <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={deleteRole} />}
            {managingRoleAuthorities && (
                <DialogManageRoleAuthorities managingRoleAuthorities={managingRoleAuthorities} setManagingRoleAuthorities={setManagingRoleAuthorities} />
            )}
        </div>
    );
}
