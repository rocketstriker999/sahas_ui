import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function HasNoAuthentication({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);

    return loggedInUser ? <Navigate to="/my-products" /> : children;
}
