import { Toast } from "primereact/toast";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Loading from "../components/common/Loading";
import { requestAPI } from "../utils";
import NoContent from "../components/common/NoContent";
import { useSelector } from "react-redux";
import ProcessToken from "../security/ProcessToken";

const ContextApp = createContext();

export const ProviderAppContainer = ({ children }) => {
    const toast = useRef(null);
    const [templateConfig, setTemplateConfig] = useState();
    const [catelogue, setCatelogue] = useState();

    const [loadingTemplateConfig, setLoadingTemplateConfig] = useState();
    const [loadingCatelogue, setLoadingCatelogue] = useState();

    const [error, setError] = useState();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    useEffect(() => {
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
    }, []);

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
        if (error) return <NoContent error={error} />;
        return children;
    };

    return (
        <div className="max-w-full lg:max-w-30rem lg:mx-auto lg:border-1 lg:my-2">
            <ContextApp.Provider value={{ toast, templateConfig, catelogue }}>
                <Toast ref={toast} position="top-right" />
                <ProcessToken>{generateAppView()}</ProcessToken>
            </ContextApp.Provider>
        </div>
    );
};

// Custom hook to access the Toast context
export const useAppContext = () => useContext(ContextApp);
