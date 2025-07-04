import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function HasNoAuthentication({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirectUrl = params.get("redirect") || "/my-products";

    return loggedInUser ? <Navigate to={redirectUrl} /> : children;
}
