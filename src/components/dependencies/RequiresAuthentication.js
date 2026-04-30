import { useSelector } from "react-redux";
import Authentication from "../../pages/Authentication";
import { KEY_AUTHENTICATION_TOKEN } from "../../constants";
import { Outlet } from "react-router-dom";

export default function RequiresAuthentication() {
    const loggedInUser = useSelector((state) => state.stateUser);


    if(!!localStorage.getItem(KEY_AUTHENTICATION_TOKEN) && !!loggedInUser) {
        return <Outlet />;
    }

    return <Authentication />;
}
