import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../providers/ProviderSahas";

export default function HasAuthentication({ children }) {
    const { authToken } = useAppContext();
    const { user } = useSelector((state) => state.stateUser);
    const location = useLocation();
    return user && authToken ? children : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
}
