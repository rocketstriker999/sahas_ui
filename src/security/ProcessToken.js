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
            onResponseReceieved: (verification, responseCode) => {
                if (verification && responseCode === 200) {
                    // eslint-disable-next-line default-case
                    dispatch(setCurrentUser(verification.user));
                }
            },
        });
    }, []);

    return loading ? <p>loading Fetching User's Account Information</p> : children;
}
