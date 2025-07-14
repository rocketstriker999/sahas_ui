import { useSelector } from "react-redux";
import Authentication from "../../pages/Authentication";
import { KEY_AUTHENTICATION_TOKEN } from "../../constants";

export default function HasAuthentication({ children }) {
    //if we authentication token already then let's verify and get the information

    //if we don't have it then it will show authentication page

    const loggedInUser = useSelector((state) => state.stateUser.user);

    return loggedInUser && localStorage.getItem(KEY_AUTHENTICATION_TOKEN) ? children : <Authentication />;
}
