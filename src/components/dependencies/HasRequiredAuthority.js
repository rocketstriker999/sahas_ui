import { useSelector } from "react-redux";
import Forbidden from "../../pages/Forbidden";

export default function HasRequiredAuthority({ requiredAuthority, showForBidden, children }) {
    const { authorities = [] } = useSelector((state) => state.stateUser);

    if (authorities.includes(requiredAuthority)) {
        return children;
    }

    if (showForBidden) {
        return <Forbidden />;
    }
}
