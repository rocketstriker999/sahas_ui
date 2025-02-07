import CarouselHeader from "../components/dashboard/CarouselHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { requestAPI } from "../utils";
import { setCatelogue } from "../redux/sliceCatelogue";
import Loading from "../components/common/Loading";

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const options = ["All Courses", "My Courses"];

    useEffect(() => {
        requestAPI({
            requestPath: "catelogue",
            setLoading: setLoading,
            onResponseReceieved: (catelogue, responseCode) => {
                if (catelogue && responseCode === 200) {
                    dispatch(setCatelogue(catelogue));
                }
            },
        });
    }, [dispatch]);

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
            {loading ? <Loading message="Fetching Products Catelogue..." /> : <Outlet />}
        </div>
    );
}
