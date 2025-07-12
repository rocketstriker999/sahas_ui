import { useSelector } from "react-redux";
import Authentication from "../../pages/Authentication";
import { KEY_AUTHENTICATION_TOKEN } from "../../constants";

export default function HasAuthentication({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);

    return loggedInUser && localStorage.getItem(KEY_AUTHENTICATION_TOKEN) ? children : <Authentication />;
}
