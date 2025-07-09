import { useSelector } from "react-redux";

export default function HasAnyAllowedRole({ allowedRoles, children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);

    if (allowedRoles?.length) {
        const userGroups = loggedInUser?.groups || [];
        const hasAllowedGroup = allowedRoles.some((group) => userGroups.includes(group));

        if (hasAllowedGroup) {
            return children;
        }
    } else {
        return children;
    }
}
