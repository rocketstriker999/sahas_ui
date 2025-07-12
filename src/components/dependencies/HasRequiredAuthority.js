import { useSelector } from "react-redux";

export default function HasRequiredAuthority({ requiredAuthority, fallBack, children }) {
    const { authorities = [] } = useSelector((state) => state.stateUser);

    if (authorities.includes(requiredAuthority)) {
        return children;
    } else {
        if (fallBack) return fallBack();
    }
}
