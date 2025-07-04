import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function HasAuthentication({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const location = useLocation();
    return loggedInUser ? children : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
}
