import { useCallback, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import TabHeader from "../common/TabHeader";
import { useAppContext } from "../../providers/ProviderAppContainer";
import OrderManager from "../common/OrderManager";
import DialogAddSuggestion from "./suggestions/DialogAddSuggestion";
import DialogEditSuggestion from "./suggestions/DialogEditSuggestion";
import Suggestion from "./suggestions/Suggestion";

export default function Suggestions() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [suggestions, setSuggestions] = useState();

    const [dialogAddSuggestion, setDialogAddSuggestion] = useState({ visible: false });
    const [dialogEditSuggestion, setDialogEditSuggestion] = useState({ visible: false });

    const closeDialogAddSuggestion = useCallback(() => setDialogAddSuggestion((prev) => ({ ...prev, visible: false })), []);
    const closeDialogEditSuggestion = useCallback(() => setDialogEditSuggestion((prev) => ({ ...prev, visible: false })), []);

    useEffect(() => {
        requestAPI({
            requestPath: `stream-selection-suggestions`,
            requestMethod: "GET",
            setLoading,
            onResponseReceieved: (suggestionsResponse, responseCode) => {
                if (suggestionsResponse && responseCode === 200) {
                    setSuggestions([...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse,...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse, ...suggestionsResponse]);
                   } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Suggestions !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

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
                                setSuggestions,
                            }))
                        }
                    />,
                ]}
            />
            <Divider />

            <div className="flex-1 overflow-y-scroll">
                <OrderManager
                    loading={loading}
                    items={suggestions}
                    setItems={setSuggestions}
                    entity={"Suggestions"}
                    itemTemplate={(item) => (
                        <Suggestion
                            id={item?.id}
                            title={item?.title}
                            pdf={item?.pdf}
                            setSuggestions={setSuggestions}
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