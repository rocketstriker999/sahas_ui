import { Fragment, useEffect, useMemo, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { getRoleFormalized } from "../utils";

export default function ManageUsers() {
    const title = useMemo(() => "Manage Users", []);

    const { requestAPI } = useAppContext();

    const [loadingRoles, setLoadingRoles] = useState(false);

    const [email, setEmail] = useState();

    const [roles, setRoles] = useState([]);

    const [users, setUsers] = useState();

    //request what roles are availabale
    //search

    useEffect(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `roles/`,
            setLoadingRoles,
            onResponseReceieved: (data, responseCode) => {
                if (data && responseCode === 200) {
                    setRoles(data);
                }
            },
        });
    }, [requestAPI]);

    const availableRoles = useMemo(() => roles?.map((role) => ({ label: getRoleFormalized(role?.title?.toLowerCase()) })), [roles]);

    return (
        <Fragment>
            <PageTitle title={title} />
            <div className="p-2">
                <div className="p-inputgroup flex-1">
                    <InputText placeholder="Search By Email" onInput={(e) => setEmail(e.target.value)} disabled={loadingRoles} />
                    <Button icon="pi pi-search" className="p-button-warning" disabled={loadingRoles} />
                </div>
            </div>
            {loadingRoles ? (
                <Loading message="Fetching Roles..." />
            ) : roles?.length ? (
                <TabMenu model={availableRoles} />
            ) : (
                <NoContent error="System Doesn't Have Roles" />
            )}
        </Fragment>
    );
}

//here need to give filters like all , students , employees,admins , developers
