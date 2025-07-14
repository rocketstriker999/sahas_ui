import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../providers/ProviderAppContainer";
import { KEY_AUTHENTICATION_TOKEN } from "../constants";
import { removeCurrentUser } from "../redux/sliceUser";

export default function Logout() {
    const loggedInUser = useSelector((state) => state.stateUser.user);

    const { applicationLoading, setApplicationLoading } = useAppContext();

    const disaptch = useDispatch();

    if (loggedInUser && !applicationLoading) {
        setApplicationLoading({ message: "Logging out..." });
        localStorage.removeItem(KEY_AUTHENTICATION_TOKEN);
        disaptch(removeCurrentUser());
        setApplicationLoading(false);
    }
}
