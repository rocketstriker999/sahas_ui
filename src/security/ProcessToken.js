import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/sliceUser";
import { requestAPI } from "../utils";
import { useToast } from "../providers/ProviderToast";

export default function ProcessToken({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestPath: "token/verify",
            setLoading: setLoading,
            onResponseReceieved: (currentUser, responseCode) => {
                if (currentUser && responseCode === 200) {
                    toast.current.show({
                        severity: "success",
                        summary: "Success",
                        detail: `Welcome Back ${currentUser.userName}`,
                        life: process.env.REACT_APP_SUCCESS_TIMEOUT,
                    });
                    // eslint-disable-next-line default-case
                    dispatch(setCurrentUser(currentUser));
                } else {
                    toast.current.show({
                        severity: "warn",
                        summary: "Login",
                        detail: "Experience Can Be Enhanced If You Can Login",
                        life: process.env.REACT_APP_INFO_TIMEOUT,
                    });
                }
            },
        });
    }, []);

    return loading ? <p>loading Fetching User's Account Information</p> : children;
}
