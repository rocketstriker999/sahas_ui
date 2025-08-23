import { useCallback, useState } from "react";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import Detail from "../../../common/Detail";
import { getReadableDate } from "../../../../utils";
import { Checkbox } from "primereact/checkbox";
import Loading from "../../../common/Loading";

export default function Role({ userId, role, ...props }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const [userRole, setUserRole] = useState(props?.userRole);

    const addRole = useCallback(() => {
        requestAPI({
            requestPath: `users/${userId}/roles`,
            requestMethod: "POST",
            setLoading: setLoading,
            requestPostBody: {
                role_id: role?.id,
            },
            onResponseReceieved: (userRole, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Role Added", life: 1000 });
                    setUserRole(userRole);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Role !", life: 2000 });
                }
            },
        });
    }, [requestAPI, role?.id, showToast, userId]);

    const deleteUserRole = useCallback(() => {
        requestAPI({
            requestPath: `user-roles/${userRole?.id}`,
            requestMethod: "DELETE",
            setLoading: setLoading,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Role Deleted", life: 1000 });
                    setUserRole();
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Role !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast, userRole?.id]);

    return (
        <div className="flex align-items-center gap-2 mb-2">
            <Detail
                icon="pi pi-angle-right"
                className="flex-1 mb-2"
                title={userRole && `Added By ${userRole?.created_by_full_name} at ${getReadableDate({ date: userRole?.created_on, removeTime: true })}`}
                value={role?.title}
            />
            {loading ? <Loading /> : <Checkbox checked={!!userRole} onChange={({ checked }) => (checked ? addRole() : deleteUserRole())}></Checkbox>}
        </div>
    );
}
