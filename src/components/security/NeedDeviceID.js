/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { requestAPI } from "../../utils/utils";
import { useToast } from "../providers/ProviderToast";

export default function NeedDeviceID({ children }) {
    const [loading, setLoading] = useState();
    const deviceId = localStorage.getItem(process.env.REACT_APP_DEVICE_KEY);
    const toast = useToast();

    useEffect(() => {
        if (!deviceId) {
            requestAPI({
                requestPath: "device/create",
                requestMethod: "GET",
                setLoading: setLoading,
                onRequestStart: () =>
                    toast.current.show({
                        severity: "warn",
                        summary: "Warning",
                        detail: "Regestering Device",
                        life: process.env.REACT_APP_INFO_TIMEOUT,
                    }),
                onResponseReceieved: (deviceRegistrationData, responseCode) => {
                    if (deviceRegistrationData && responseCode === 201) {
                        localStorage.setItem(process.env.REACT_APP_DEVICE_KEY, deviceRegistrationData[process.env.REACT_APP_DEVICE_KEY]);
                    } else throw new Error("Unable to Create/Register Device");
                },
                onRequestFailure: () => {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Failed To Regestering Device",
                        life: process.env.REACT_APP_INFO_TIMEOUT,
                    });
                },
            });
        }
    }, []);

    if (deviceId) {
        return children;
    }
}
