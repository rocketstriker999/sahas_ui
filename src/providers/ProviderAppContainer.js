import { Toast } from "primereact/toast";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { generateDeviceFingerprint } from "../utils";
import Loading from "../components/common/Loading";
import { KEY_DEVICE_FINGER_PRINT, KEY_AUTHENTICATION_TOKEN } from "../constants";
import Error from "../pages/Error";

const ContextApp = createContext();

export const ProviderAppContainer = ({ children }) => {
    const [applicationError, setApplicationError] = useState();
    const [applicationLoading, setApplicationLoading] = useState();
    const [deviceFingerPrint, setDeviceFingerPrint] = useState();
    const isDevelopmentBuild = process.env.NODE_ENV === "development";

    const toastRef = useRef(null);

    //generating Device FingerPrint
    useEffect(() => {
        setApplicationLoading({ message: "Generating Device Fingerprint..." });
        generateDeviceFingerprint()
            .then(setDeviceFingerPrint)
            .catch(() => setApplicationError("Failed To Generate Device Fingerprint"))
            .finally(setApplicationLoading);
    }, []);

    const showToast = (config) => {
        toastRef.current.show(config);
    };

    //api requests
    const requestAPI = useCallback(
        async function ({
            requestHeaders = {},
            requestPath,
            requestMethod = "GET",
            requestGetQuery = false,
            requestPostBody = false,
            onRequestStart = false,
            setLoading = false,
            onResponseReceieved = false,
            parseResponseBody = true,
            onRequestFailure = console.log,
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
                    [KEY_AUTHENTICATION_TOKEN]: localStorage.getItem(KEY_AUTHENTICATION_TOKEN),
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
                const jsonResponse = parseResponseBody ? await response.json() : response;
                if (response.status === 503) {
                    return setApplicationError({
                        icon: "images/maintenance.gif",
                        title: "Under Maintenance",
                        message: "The application is currently under maintenance. Please try again later.",
                    });
                }
                if (onResponseReceieved) onResponseReceieved(jsonResponse, response.status);
            } catch (e) {
                if (onRequestFailure) onRequestFailure(e.toString());
            } finally {
                if (setLoading) setLoading(false);
            }
            if (onRequestEnd) onRequestEnd();
        },
        [deviceFingerPrint]
    );

    return (
        <ContextApp.Provider
            value={{ showToast, setApplicationError, requestAPI, applicationLoading, setApplicationLoading, isDevelopmentBuild, deviceFingerPrint }}
        >
            <Toast ref={toastRef} position="top-center" />

            {applicationLoading ? (
                <Loading message={applicationLoading.message} />
            ) : applicationError ? (
                <Error {...applicationError} />
            ) : (
                deviceFingerPrint && children
            )}
        </ContextApp.Provider>
    );
};

// Custom hook to access the Toast context
export const useAppContext = () => useContext(ContextApp);
