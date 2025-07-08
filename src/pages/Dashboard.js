import Carousel from "../components/dashboard/Carousel";
import { useSelector } from "react-redux";
import UserPanel from "../components/dashboard/UserPanel";
import LoginAdvice from "../components/dashboard/LoginAdvice";
import Operations from "../components/dashboard/Operations";

export default function Dashboard() {
    const loggedInUser = useSelector((state) => state.stateUser.user);

    const pageConfig = useSelector((state) => state.stateTemplateConfig?.dash_board);

    return (
        <div>
            <Carousel images={pageConfig?.carousel?.images} />
            {loggedInUser ? <UserPanel {...loggedInUser} /> : <LoginAdvice />}
            <Operations operationsSections={pageConfig?.opertions_sections} />
        </div>

        // <div className="text-center ">
        //     <Navbar />
        //
        //     <SelectButton
        //         className="mt-3"
        //         value={location.pathname === "/" ? "All Courses" : "My Courses"}
        //         onChange={(e) => navigate(e.value === options[0] ? "/" : "/my-products")}
        //         options={options}
        //     />
        //     <Outlet />
        // </div>
    );
}
