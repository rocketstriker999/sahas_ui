import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/sliceUser";
import { requestAPI } from "../utils";
import Loading from "../components/common/Loading";
import { useAppContext } from "../providers/ProviderSahas";

export default function ProcessToken({ children }) {
    const { authToken, setAuthToken } = useAppContext();
    const user = useSelector((state) => state.stateUser.user);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState();

    useEffect(() => {
        if (authToken && !user)
            requestAPI({
                requestPath: `auth-tokens/${authToken}`,
                setLoading: setLoading,
                onResponseReceieved: (verification, responseCode) => {
                    if (verification && responseCode === 200) {
                        dispatch(setCurrentUser(verification.user));
                    }

                    setAuthToken();
                },
            });
    }, [authToken, dispatch, setAuthToken, user]);

    if (loading) return <Loading message={"Processing Token..."} />;

    return children;
}
