import CarouselHeader from "../components/dashboard/CarouselHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useSelector } from "react-redux";
import UserPanel from "../components/dashboard/UserPanel";

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    return (
        <UserPanel user={loggedInUser || { name: "dwa" }} />

        // <div className="text-center ">
        //     <Navbar />
        //     <CarouselHeader />
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
