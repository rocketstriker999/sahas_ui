import PageTitle from "../components/common/PageTitle";
import { Outlet } from "react-router-dom";

export default function ManageRoles() {
    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={"Manage Roles"} />
            <div className="flex-1 min-h-0 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}
