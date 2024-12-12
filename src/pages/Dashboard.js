import { Fragment } from "react";
import CarouselHeader from "../components/dashboard/CarouselHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { useLocation } from "react-router-dom";
import { classNames } from "primereact/utils";

export default function Dashboard() {
    const options = ["All Courses", "My Courses"];

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    return (
        <Fragment>
            <CarouselHeader />
            <div className="card flex justify-content-center mt-3">
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
            </div>
            <Outlet />
            {/* <Catelogue /> */}
        </Fragment>
    );
}
