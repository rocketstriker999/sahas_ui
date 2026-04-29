import { useCallback, useState } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import TabHeader from "../common/TabHeader";
import { useAppContext } from "../../providers/ProviderAppContainer";
import OrderManager from "../common/OrderManager";
import DialogAddSuggestion from "./suggestions/DialogAddSuggestion";
import DialogEditSuggestion from "./suggestions/DialogEditSuggestion";
import Suggestion from "./suggestions/Suggestion";
import { useDispatch, useSelector } from "react-redux";
import { setStreamSelectionSuggestions } from "../../redux/sliceTemplateConfig";

export default function Suggestions() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const dispatch = useDispatch();


    const { suggestions = [] } = useSelector((state) => state.stateTemplateConfig?.stream_selection);


    const [dialogAddSuggestion, setDialogAddSuggestion] = useState({ visible: false });
    const [dialogEditSuggestion, setDialogEditSuggestion] = useState({ visible: false });

    const closeDialogAddSuggestion = useCallback(() => setDialogAddSuggestion((prev) => ({ ...prev, visible: false })), []);
    const closeDialogEditSuggestion = useCallback(() => setDialogEditSuggestion((prev) => ({ ...prev, visible: false })), []);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-suggestions/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: suggestions?.map(({ id }, view_index) => ({ id, view_index })),
            setLoading: setLoading,
            parseResponseBody: false,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update View Indexes !", life: 2000 }),
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 200) {
                    showToast({
                        severity: "success",
                        summary: "Updated",
                        detail: `View Indexes Updated`,
                        life: 1000,
                    });
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Update View Indexes !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast, suggestions]);



    return (
        <div className="flex-1 flex flex-column min-h-0 h-full">
            <TabHeader
                className={"mx-3 mt-2"}
                title="Suggestion"
                highlights={[`Total ${suggestions?.length} Suggestions`]}
                actionItems={[
                    <Button
                        icon="pi pi-plus"
                        severity="warning"
                        onClick={() =>
                            setDialogAddSuggestion((prev) => ({
                                ...prev,
                                visible: true,
                                closeDialog: closeDialogAddSuggestion,
                            }))
                        }
                    />,
                    !!suggestions?.length && (
                        <Button
                            loading={loading}
                            onClick={() => {
                                showToast({
                                    severity: "info",
                                    summary: "Repositioning",
                                    detail: `Repositioning Mode ${!updatingViewIndex ? "Enabled" : "Disabled"}`,
                                    life: 1000,
                                });
                                if (!!updatingViewIndex) {
                                    updateViewIndexs();
                                }
                                setUpdatingViewIndex((prev) => !prev);
                            }}
                            icon="pi pi-arrows-v"
                        />
                    ),
                ]}
            />
            <Divider />

            <div className="flex-1 overflow-y-scroll">
                <OrderManager
                    loading={loading}
                    updatingViewIndex={updatingViewIndex}
                    items={suggestions}
                    setItems={(items) =>
                        dispatch(setStreamSelectionSuggestions(items(suggestions)))
                    }
                    entity={"Suggestions"}
                    itemTemplate={(item) => (
                        <Suggestion
                            id={item?.id}
                            title={item?.title}
                            pdf={item?.pdf}
                            updatingViewIndex={updatingViewIndex}
                            setDialogEditSuggestion={setDialogEditSuggestion}
                        />
                    )}
                />
            </div>

            {dialogAddSuggestion?.visible && <DialogAddSuggestion {...dialogAddSuggestion} />}
            {dialogEditSuggestion?.visible && <DialogEditSuggestion {...dialogEditSuggestion} closeDialog={closeDialogEditSuggestion} />}
        </div>
    );
}