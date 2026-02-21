import { Checkbox } from "primereact/checkbox";
import { useCallback, useState } from "react";
import { getReadableDate } from "../../../../utils";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import ProgressiveControl from "../../../common/ProgressiveControl";
import { useSelector } from "react-redux";
import { AUTHORITIES } from "../../../../constants";
import HasRequiredAuthority from "../../../dependencies/HasRequiredAuthority";

export default function Device(device) {
    const { requestAPI, showToast } = useAppContext();
    const [active, setActive] = useState(device?.active);
    const [loading, setLoading] = useState();

    const { authorities = [] } = useSelector((state) => state.stateUser);

    const updateDevice = useCallback(
        ({ checked }) => {
            requestAPI({
                requestPath: `devices`,
                requestMethod: "PATCH",
                requestPostBody: { id: device.id, active: checked },
                setLoading: setLoading,
                onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Device !", life: 2000 }),
                onResponseReceieved: ({ error, ...device }, responseCode) => {
                    if (responseCode === 200) {
                        showToast({
                            severity: "success",
                            summary: "Updated",
                            detail: `Device Updated`,
                            life: 1000,
                        });
                        setActive(device?.active);
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Update View Indexes !", life: 2000 });
                    }
                },
            });
        },
        [device, requestAPI, showToast],
    );

    return (
        <div className="p-2 border-1 border-round border-gray-300 text-xs">
            <div className="  word-break-all flex align-items-center gap-2">
                <span>
                    {device?.index + 1}. {decodeURIComponent(escape(atob(device?.finger_print)))?.split("|")[0]}
                </span>
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_USER_DEVICE}>
                    <ProgressiveControl
                        loading={loading}
                        control={
                            <Checkbox
                                onChange={updateDevice}
                                checked={!!active}
                            />
                        }
                    />
                </HasRequiredAuthority>
            </div>
            <div className="flex justify-content-between mt-2 text-color-secondary font-semibold">
                <span>Created At {getReadableDate({ date: device?.created_on })}</span>
            </div>
        </div>
    );
}
