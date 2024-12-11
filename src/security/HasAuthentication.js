import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function HasAuthentication({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);

    return loggedInUser ? children : <Navigate to="/login" />;
}
