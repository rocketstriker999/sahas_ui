import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/sliceUser";
import { requestProxy } from "../utils";

export default function ProcessToken({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //hit API Once
        requestProxy({
            requestPath: "/api/token/verify",
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
