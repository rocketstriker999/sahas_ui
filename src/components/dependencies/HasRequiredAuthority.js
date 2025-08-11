import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function HasRequiredAuthority({ requiredAuthority, fallBack, children }) {
    const { authorities = [] } = useSelector((state) => state.stateUser);

    useEffect(() => {
        if (!authorities.includes(requiredAuthority)) {
            fallBack();
        }
    }, [authorities, fallBack, requiredAuthority]);

    return children;
}
