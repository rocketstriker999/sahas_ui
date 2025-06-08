// ToastContext.js
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";

import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "primereact/hooks";
import { requestAPI } from "../utils";
import { setConfigs } from "../redux/sliceConfigs";

const ContextApp = createContext(null);

export const ProviderSahas = ({ children }) => {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const toastRef = useRef(null);
    const showToast = useCallback((message) => toastRef.current?.show(message), []);
    const [authToken, setAuthToken] = useLocalStorage(undefined, process.env.REACT_APP_AUTH_TOKEN_KEY);
    const configs = useSelector((state) => state.stateConfigs);

    useEffect(() => {
        if (!configs) {
            requestAPI({
                requestPath: "configs",
                onLoading: setLoading,
                onRequestFailure: setError,
                onResponseReceieved: (configs, responseCode) => {
                    if (configs && responseCode === 200) {
                        dispatch(setConfigs(configs));
                    }
                },
            });
        }
    }, [configs, dispatch, setError, setLoading]);

    return (
        <ContextApp.Provider value={{ showToast, loading, setLoading, error, setError, dispatch, authToken, setAuthToken }}>
            <div>
                <Toast ref={toastRef} position="top-right" />
                {children}
            </div>
        </ContextApp.Provider>
    );
};

export const useAppContext = () => useContext(ContextApp);
