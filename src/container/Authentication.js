import { useSelector, useDispatch } from "react-redux";
import Login from "../pages/Login";
import { KEY_AUTHENTICATION_TOKEN } from "../constants";
import { useEffect, useCallback } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import { setCurrentUser } from "../redux/sliceUser";
import { Outlet } from "react-router-dom";

export default function Authentication() {
    const { requestAPI, applicationLoading, setApplicationLoading } = useAppContext();

    const loggedInUser = useSelector((state) => state.stateUser);

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


    return !!localStorage.getItem(KEY_AUTHENTICATION_TOKEN) && !!loggedInUser ? <Outlet/> : <Login />;

    
}
