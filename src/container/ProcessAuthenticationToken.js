import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KEY_AUTHENTICATION_TOKEN } from "../constants";
import { useAppContext } from "../providers/ProviderAppContainer";
import { setCurrentUser } from "../redux/sliceUser";

export default function ProcessAuthenticationToken({children}) {
    const { requestAPI, applicationLoading, setApplicationLoading } = useAppContext();

    const loggedInUser = useSelector((state) => state.stateUser);

    const dispatch = useDispatch();

    const clearAuthenticationToken = useCallback(() => localStorage.removeItem(KEY_AUTHENTICATION_TOKEN), []);

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

    return children;

}

