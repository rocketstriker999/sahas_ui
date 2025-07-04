import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useAppContext } from "../../providers/ProviderAppContainer";

export default function Logout() {
    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: "token/invalidate",
            requestMethod: "POST",
            setLoading: setLoading,
            onResponseReceieved: () => {
                navigate("/");
            },
        });
    }, [navigate, requestAPI]);

    return loading && <Loading message="Logging out, please wait..." />;
}
