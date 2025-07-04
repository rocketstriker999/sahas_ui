import { Toast } from "primereact/toast";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import NoContent from "../components/common/NoContent";
import { generateDeviceFingerprint } from "../utils";
import Loading from "../components/common/Loading";
import { KEY_DEVICE_FINGER_PRINT } from "../constants";
import { useNavigate } from "react-router-dom";

const ContextApp = createContext();

export const ProviderAppContainer = ({ children }) => {
    const [applicationError, setApplicationError] = useState();
    const [loadingDevice, setLoadingDevice] = useState();
    const [deviceFingerPrint, setDeviceFingerPrint] = useState();

    const toastRef = useRef(null);

    const navigate = useNavigate();

    //generating Device FingerPrint
    useEffect(() => {
        setLoadingDevice(true);
        generateDeviceFingerprint().then(setDeviceFingerPrint).catch(setApplicationError).finally(setLoadingDevice);
    }, []);

    //api requests
    const requestAPI = useCallback(
        async function requestAPI({
            requestHeaders = {},
            requestPath,
            requestMethod = "GET",
            requestGetQuery = false,
            requestPostBody = false,
            onRequestStart = false,
            setLoading = false,
            onResponseReceieved = false,
            onRequestFailure = false,
            onRequestEnd = false,
        } = {}) {
            if (onRequestStart) onRequestStart();
            if (setLoading) setLoading(true);

            //append api backend service path
            requestPath = process.env.REACT_APP_BACKEND_SERVER.concat(process.env.REACT_APP_API_PATH).concat(requestPath);

            //api specific path
            if (requestGetQuery) {
                requestPath = requestPath + "?";
                requestPath =
                    requestPath +
                    Object.keys(requestGetQuery)
                        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(requestGetQuery[key]))
                        .join("&");
            }

            const fetchOptions = {
                // Adding headers to the request
                headers: {
                    "Content-Type": "application/json",
                    [KEY_DEVICE_FINGER_PRINT]: deviceFingerPrint,
                    ...requestHeaders,
                },
                // Adding method type
                method: requestMethod.toUpperCase(),
            };

            if (requestPostBody) {
                fetchOptions.body = JSON.stringify(requestPostBody);
            }

            try {
                const response = await fetch(requestPath, fetchOptions);
                const jsonResponse = await response.json();
                if (response.status === 503 || response.status === 404) {
                    navigate("/maintenance");
                }
                if (onResponseReceieved) onResponseReceieved(jsonResponse, response.status);
            } catch (e) {
                if (onRequestFailure) onRequestFailure(e.toString());
            } finally {
                if (setLoading) setLoading(false);
            }
            if (onRequestEnd) onRequestEnd();
        },
        [deviceFingerPrint, navigate]
    );

    if (loadingDevice) return <Loading message="Loading Device Information..." />;

    if (!loadingDevice && applicationError) return <NoContent error={applicationError} />;

    if (!loadingDevice && !applicationError && deviceFingerPrint) {
        return (
            <div className="max-w-full lg:max-w-30rem lg:mx-auto lg:border-1 lg:my-2">
                <ContextApp.Provider value={{ toastRef, setApplicationError, requestAPI }}>
                    <Toast ref={toastRef} position="top-right" />
                    <p>Device ID - {deviceFingerPrint} </p>
                    {children}
                </ContextApp.Provider>
            </div>
        );
    }
};

// Custom hook to access the Toast context
export const useAppContext = () => useContext(ContextApp);
