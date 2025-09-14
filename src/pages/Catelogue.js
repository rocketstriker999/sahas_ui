import { Outlet } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

export default function Catelogue() {
    return (
        <div className="h-full overflow-hidden ">
            <PageTitle title={"Courses"} />
            <Outlet />
        </div>
    );
}
