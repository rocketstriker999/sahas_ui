import CarouselHeader from "../components/dashboard/CarouselHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const catelogue = useSelector((state) => state.stateCatelogue);

    useEffect(() => {}, [dispatch]);

    const options = ["All Courses", "My Courses"];

    return (
        <div className="text-center ">
            <Navbar />
            <CarouselHeader />
            <SelectButton
                className="mt-3"
                value={location.pathname === "/" ? "All Courses" : "My Courses"}
                onChange={(e) => navigate(e.value === options[0] ? "/" : "/my-products")}
                options={options}
            />
            {catelogue && <Outlet />}
        </div>
    );
}
