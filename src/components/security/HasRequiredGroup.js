import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hasGroupAccess } from "../../utils/utils";

export default function HasRequiredGroup({ allowedGroups, children }) {
    const userData = useSelector((state) => state.stateUser.user);

    if (userData) {
        return hasGroupAccess(userData.groups, allowedGroups) ? (
            children
        ) : (
            <Navigate to="/forbidden" />
        );
    } else {
        //ask for login
        return <Navigate to="/login" />;
    }
}
