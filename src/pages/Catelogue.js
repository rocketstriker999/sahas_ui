import { Outlet } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

export default function Catelogue() {
    return (
        <div className="flex flex-column gap-2">
            <PageTitle title={"Courses"} />
            <Outlet />
        </div>
    );
}
