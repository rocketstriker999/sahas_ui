import TabHeader from "../../common/TabHeader";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import NoContent from "../../common/NoContent";
import Loading from "../../common/Loading";
import Role from "./roles/Role";

export default function Roles() {
    const { userId, roles } = useOutletContext();
    const [userRoles, setUserRoles] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}/roles`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (userRoles, responseCode) => {
                if (userRoles && responseCode === 200) {
                    setUserRoles(userRoles);
                } else {
                    setError("Couldn't load Roles");
                }
            },
        });
    }, [requestAPI, userId]);

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader className={"px-3 pt-3"} title="User's Roles" highlights={[`Total - ${userRoles?.length} Roles`]} />
            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Roles" />
                ) : error ? (
                    <NoContent error={error} />
                ) : roles?.length ? (
                    roles
                        .map(({ id, ...rest }) => ({ role_id: id, ...rest }))
                        .map((userRole) => <Role key={userRole?.role_id} {...(userRoles?.find(({ role_id }) => role_id === userRole?.role_id) || userRole)} />)
                ) : (
                    <NoContent error={"No Roles Found"} />
                )}
            </div>
        </div>
    );
}
