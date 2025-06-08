import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../providers/ProviderSahas";

export default function HasNoAuthentication({ children }) {
    const { authToken } = useAppContext();
    const { user } = useSelector((state) => state.stateUser.user);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    return user && authToken ? <Navigate to={params.get("redirect") || "/dashboard"} /> : children;
}
