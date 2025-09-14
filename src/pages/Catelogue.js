import { Outlet } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

export default function Catelogue() {
    return (
        <div className="flex flex-column h-full ">
            <PageTitle title={"Courses"} />
            <Outlet />
        </div>
    );
}
