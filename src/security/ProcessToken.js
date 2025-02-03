import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/sliceUser";
import { requestAPI } from "../utils";
import Loading from "../components/common/Loading";

export default function ProcessToken({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requestAPI({
            requestPath: "token/verify",
            setLoading: setLoading,
            onResponseReceieved: (verification, responseCode) => {
                if (verification && responseCode === 200) {
                    dispatch(setCurrentUser(verification.user));
                }
            },
        });
    }, [dispatch]);

    return loading ? <Loading message={"Processing Token..."} /> : children;
}
