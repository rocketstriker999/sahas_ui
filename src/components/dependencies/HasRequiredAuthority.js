import { useSelector } from "react-redux";
import Forbidden from "../../pages/Forbidden";
import { hasRequiredAuthority } from "../../utils";

export default function HasRequiredAuthority({ requiredAuthority = false, showForBidden, children }) {
    const { authorities = [] } = useSelector((state) => state.stateUser);

    if (hasRequiredAuthority(authorities, requiredAuthority)) {
        return children;
    }

    if (showForBidden) {
        return <Forbidden />;
    }
}
