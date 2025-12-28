import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import TabHeader from "../../common/TabHeader";
import { Divider } from "primereact/divider";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import { Accordion } from "primereact/accordion";

export default function Devices() {
    const { userId } = useOutletContext();
    const [devices, setDevices] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}/devices`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (devices, responseCode) => {
                if (devices && responseCode === 200) {
                    setDevices(devices);
                } else {
                    setError("Couldn't load Devices");
                }
            },
        });
    }, [requestAPI, userId]);

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader className={"px-3 pt-3"} title="User's Devices" highlights={[`Total - ${devices?.length} Devices`]} />
            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Devices" />
                ) : error ? (
                    <NoContent error={error} />
                ) : devices?.length ? (
                    devices.map((device, index) => <span className="p-1 border-1">{decodeURIComponent(escape(atob(device?.finger_print)))}</span>)
                ) : (
                    <NoContent error={"No Devices Found"} />
                )}
            </div>
        </div>
    );
}
