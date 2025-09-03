import { useCallback, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Detail from "../common/Detail";
import { getReadableDate } from "../../utils";
import ProgressiveControl from "../common/ProgressiveControl";

export default function Authority({ roleId, authority_id, title, ...props }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [roleAuthority, setRoleAuthority] = useState(props);

    const addRoleAuthority = useCallback(() => {
        requestAPI({
            requestPath: `role-authorities`,
            requestMethod: "POST",
            requestPostBody: { role_id: roleId, authority_id },
            setLoading: setLoading,
            onResponseReceieved: (roleAuthority, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Authority Added", life: 1000 });
                    setRoleAuthority(() => roleAuthority);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Authority !", life: 2000 });
                }
            },
        });
    }, [authority_id, requestAPI, roleId, showToast]);

    const deleteRoleAuthority = useCallback(() => {
        requestAPI({
            requestPath: `role-authorities/${roleAuthority?.id}`,
            requestMethod: "DELETE",
            parseResponseBody: false,
            setLoading: setLoading,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Added", detail: "Authority Deleted", life: 1000 });
                    setRoleAuthority(({ id, ...rest }) => rest);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Authority !", life: 2000 });
                }
            },
        });
    }, [requestAPI, roleAuthority?.id, showToast]);

    return (
        <div className="flex align-items-center gap-2 ">
            <Detail
                icon="pi pi-angle-right"
                className="flex-1 "
                title={roleAuthority?.id && `Created At ${getReadableDate({ date: roleAuthority?.created_on })} By ${roleAuthority?.created_by_full_name}`}
                value={title}
            />

            <ProgressiveControl
                loading={loading}
                control={<Checkbox checked={Boolean(roleAuthority?.id)} onChange={({ checked }) => (checked ? addRoleAuthority() : deleteRoleAuthority())} />}
            />
        </div>
    );
}
