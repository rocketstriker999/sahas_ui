import { useCallback, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Detail from "../common/Detail";
import { getReadableDate } from "../../utils";
import Loading from "../common/Loading";

export default function Authority({ id, roleId, roleAuthorityId, title, created_on, created_by_full_name, setRoleAuthorities }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const [checked, setChecked] = useState(!!roleAuthorityId);

    const addRoleAuthority = useCallback(() => {
        requestAPI({
            requestPath: `roles/${roleId}/authorities`,
            requestMethod: "POST",
            requestPostBody: { authority_id: id },
            setLoading: setLoading,
            onResponseReceieved: (roleAuthority, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Authority Added", life: 1000 });
                    setRoleAuthorities((prev) => prev.map((authority) => (authority.id === id ? roleAuthority : authority)));
                    setChecked(() => true);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Authority !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, roleId, setRoleAuthorities, showToast]);

    const deleteRoleAuthority = useCallback(() => {
        requestAPI({
            requestPath: `role-authorities/${id}`,
            requestMethod: "DELETE",
            requestPostBody: { authority_id: id },
            setLoading: setLoading,
            onResponseReceieved: (authority, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Authority Deleted", life: 1000 });
                    setChecked(false);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Authority !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, showToast]);

    return (
        <div className="flex align-items-center gap-2 ">
            <Detail
                icon="pi pi-angle-right"
                className="flex-1 "
                title={created_by_full_name && `Created At ${getReadableDate({ date: created_on })} By ${created_by_full_name}`}
                value={title}
            />
            {loading ? (
                <Loading />
            ) : (
                <Checkbox checked={!!checked} onChange={({ checked }) => (checked ? addRoleAuthority() : deleteRoleAuthority())}></Checkbox>
            )}
        </div>
    );
}
