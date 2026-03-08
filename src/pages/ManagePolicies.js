import PageTitle from "../components/common/PageTitle";
import { Outlet } from "react-router-dom";

export default function ManagePolicies() {
    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Policies`} />
            <div className="flex-1 min-h-0 flex flex-column overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}
