import PageTitle from "../components/common/PageTitle";
import { Outlet } from "react-router-dom";

export default function ManageUsers() {
    return (
        <div className="flex flex-column h-screen">
            <PageTitle title={"Manage Users"} />
            <Outlet />
        </div>
    );
}
