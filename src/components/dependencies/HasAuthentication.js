import { useSelector, useDispatch } from "react-redux";
import Authentication from "../../pages/Authentication";
import { KEY_AUTHENTICATION_TOKEN } from "../../constants";
import { useEffect, useCallback } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { setCurrentUser } from "../../redux/sliceUser";

export default function HasAuthentication({ children }) {
    const { requestAPI, applicationLoading, setApplicationLoading } = useAppContext();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    const dispatch = useDispatch();

    const clearAuthenticationToken = useCallback(() => localStorage.removeItem(KEY_AUTHENTICATION_TOKEN), []);

    //check if token already exist and we can verify it
    useEffect(() => {
        if (!applicationLoading && !loggedInUser && localStorage.getItem(KEY_AUTHENTICATION_TOKEN)) {
            requestAPI({
                requestPath: "authentication-tokens",
                onRequestFailure: clearAuthenticationToken,
                setLoading: (loading) => setApplicationLoading(loading ? { message: "Validating Authentication Token..." } : loading),
                onResponseReceieved: (user, responseCode) => {
                    if (user && responseCode === 200) {
                        dispatch(setCurrentUser(user));
                    } else {
                        clearAuthenticationToken();
                    }
                },
            });
        }
    }, [applicationLoading, clearAuthenticationToken, dispatch, loggedInUser, requestAPI, setApplicationLoading]);

    //if user is logged in and token is verified
    if (loggedInUser) {
        return children;
    }

    //if we don't have token , let's generate a token
    if (!localStorage.getItem(KEY_AUTHENTICATION_TOKEN)) {
        return <Authentication />;
    }
}
