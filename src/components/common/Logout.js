import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { requestAPI } from "../../utils";

export default function Logout() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: "token/invalidate",
            requestMethod: "DELETE",
            setLoading: setLoading,
            onResponseReceieved: () => {
                navigate("/");
            },
        });
    }, []);

    return loading && <Loading message="Logging out, please wait..." />;
}
