import { Fragment } from "react";
import CarouselHeader from "../components/dashboard/CarouselHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
    const options = ["All Courses", "My Courses"];

    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="lg:mx-auto text-center  lg:max-w-30rem">
            <CarouselHeader />
            <SelectButton
                value={location.pathname === "/" ? "All Courses" : "My Courses"}
                onChange={(e) => {
                    if (e.value === options[0]) {
                        navigate("/");
                    } else {
                        navigate("/my-products");
                    }
                }}
                options={options}
            />
            <Outlet />
        </div>
    );
}
