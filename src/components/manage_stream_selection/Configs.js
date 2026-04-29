
import { useDispatch, useSelector } from "react-redux";
import CheckboxInput from "../common/CheckBoxInput";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { TEXT_NORMAL } from "../../style";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { setStreamSelection } from "../../redux/sliceTemplateConfig";

export default function Configs() {

    const [loading, setLoading] = useState();
    const [streamSelectionConfig, setStreamSelectionConfig] = useState();

    const { stream_selection = {} } = useSelector((state) => state.stateTemplateConfig);
    const dispatch = useDispatch();

    const { requestAPI, showToast } = useAppContext();

    useEffect(() => setStreamSelectionConfig(stream_selection), [])


    const updateConfig = useCallback(() => {
        requestAPI({
            requestPath: `template-configs/stream-selection`,
            requestMethod: "PUT",
            requestPostBody: streamSelectionConfig,
            setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Config !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedConfig }, responseCode) => {
                if (updatedConfig && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Config Updated", life: 1000 });
                    dispatch(setStreamSelection(updatedConfig));
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Update Config !", life: 2000 });
            },
        });
    }, [requestAPI, showToast, dispatch, streamSelectionConfig]);

    return (
        <div className="flex flex-column h-full overflow-hidden p-2">





            <CheckboxInput
                label={"Allow External Psychometric Test "}
                checked={!!streamSelectionConfig?.external_attendees}
                onChange={(checked) => setStreamSelectionConfig((prev) => ({ ...prev, external_attendees: checked }))}
            />

            <FloatLabel className="flex-1 mt-5">
                <InputNumber
                    useGrouping={false}
                    className="w-full"
                    value={streamSelectionConfig?.fees || ""}
                    onChange={(e) => setStreamSelectionConfig((prev) => ({ ...prev, fees: e.value }))}
                    id="external_attendees_fees"
                    pt={{
                        root: { className: TEXT_NORMAL },
                    }}
                />
                <label htmlFor="external_attendees_fees">External Attendees Fees</label>
            </FloatLabel>

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_USER}>
                <Button
                    className="mx-3 my-2"
                    label="Update"
                    severity="warning"
                    loading={loading}
                    disabled={!streamSelectionConfig}
                    onClick={updateConfig}
                    pt={{
                        label: { className: TEXT_NORMAL },
                        icon: { className: TEXT_NORMAL },
                    }}
                />
            </HasRequiredAuthority>







        </div>);
}