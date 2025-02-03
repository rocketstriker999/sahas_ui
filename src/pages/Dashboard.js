import CarouselHeader from "../components/dashboard/CarouselHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { requestAPI } from "../utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatelogue } from "../redux/sliceCatelogue";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const catelogue = useSelector((state) => state.stateCatelogue);

    useEffect(() => {
        requestAPI({
            requestPath: "api/catelogue",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (catelogue, responseCode) => {
                if (catelogue && responseCode === 200) {
                    dispatch(setCatelogue(catelogue));
                }
            },
        });
    }, [dispatch]);

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
            {loading && <Loading message="Fetching Catelogue..." />}
            {error && <NoContent />}
            {catelogue && <Outlet />}
        </div>
    );
}
