import { Toast } from "primereact/toast";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Loading from "../components/common/Loading";
import { requestAPI } from "../utils";
import NoContent from "../components/common/NoContent";
import { useSelector } from "react-redux";
import ProcessToken from "../security/ProcessToken";
import platform from "platform";

const ContextApp = createContext();

export const ProviderAppContainer = ({ children }) => {
    const toast = useRef(null);
    const [templateConfig, setTemplateConfig] = useState();
    const [catelogue, setCatelogue] = useState();
    const [loadingTemplateConfig, setLoadingTemplateConfig] = useState();
    const [loadingCatelogue, setLoadingCatelogue] = useState();
    const [loadingDevice, setLoadingDevice] = useState();

    //need to uncomment after a week
    //const [deviceFingerPrint, setDeviceFingerPrint] = useState(localStorage.getItem("device_finger_print"));

    const [deviceFingerPrint, setDeviceFingerPrint] = useState("temp_device");
    localStorage.removeItem("device_finger_print");

    const [error, setError] = useState();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    useEffect(() => {
        if (!templateConfig)
            requestAPI({
                requestPath: "configs/template",
                setLoading: setLoadingTemplateConfig,
                onRequestFailure: setError,
                onResponseReceieved: (config, responseCode) => {
                    if (config && responseCode === 200) {
                        setTemplateConfig(config);
                    }
                },
            });
    }, [templateConfig]);

    useEffect(() => {
        if (!deviceFingerPrint) {
            requestAPI({
                requestPath: "device/create",
                requestMethod: "POST",
                requestPostBody: {
                    device: platform.description,
                },
                setLoading: setLoadingDevice,
                onRequestFailure: setError,
                onResponseReceieved: (deviceCreation, responseCode) => {
                    if (deviceCreation?.device_finger_print && responseCode === 201 && !deviceFingerPrint) {
                        setDeviceFingerPrint(() => {
                            localStorage.setItem("device_finger_print", deviceCreation?.device_finger_print);
                            return deviceCreation?.device_finger_print;
                        });
                    }
                },
            });
        }
    }, [deviceFingerPrint]);

    useEffect(() => {
        requestAPI({
            requestPath: "catelogue",
            setLoading: setLoadingCatelogue,
            onRequestFailure: setError,
            onResponseReceieved: (catelogue, responseCode) => {
                if (catelogue && responseCode === 200) {
                    setCatelogue(catelogue);
                }
            },
        });
    }, [loggedInUser]);

    const generateAppView = () => {
        if (loadingTemplateConfig || loadingCatelogue) return <Loading message="Loading App Configuration..." />;
        if (loadingCatelogue) return <Loading message="Loading Courses..." />;
        if (loadingDevice) return <Loading message="Validating Device..." />;
        if (error) return <NoContent error={error} />;
        if (templateConfig && catelogue && deviceFingerPrint) return children;
        return <NoContent error={"Failed To Load Application"} />;
    };

    return (
        <div className="max-w-full lg:max-w-30rem lg:mx-auto lg:border-1 lg:my-2">
            <ContextApp.Provider value={{ toast, templateConfig, catelogue, setApplicationError: setError }}>
                <Toast ref={toast} position="top-right" />
                <ProcessToken>{generateAppView()}</ProcessToken>
            </ContextApp.Provider>
        </div>
    );
};

// Custom hook to access the Toast context
export const useAppContext = () => useContext(ContextApp);
