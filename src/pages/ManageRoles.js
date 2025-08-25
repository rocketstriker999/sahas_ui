import PageTitle from "../components/common/PageTitle";
import TabHeader from "../components/common/TabHeader";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import NoContent from "../components/common/NoContent";
import Role from "../components/manage_roles/Role";

export default function ManageRoles() {
    const { roles = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={"Manage Authorities"} />
            <TabHeader
                className={"px-3 pt-3"}
                title="Roles"
                highlights={[`Total - ${roles?.length} Roles`]}
                actionItems={[<Button icon="pi pi-plus" severity="warning" />]}
            />
            <Divider />
            <div className="flex-1 px-3  overflow-y-scroll gap-3 flex flex-column">
                {roles?.length ? roles?.map((role) => <Role key={role?.id} {...role} />) : <NoContent error={"No Roles Found"} />}
            </div>
        </div>
    );
}
