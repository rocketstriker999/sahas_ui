import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

export default function DialogAddPolicy({ visible, setPolicies, closeDialog, useDummyData }) {
    const { requestAPI, showToast } = useAppContext();

    const [policy, setPolicy] = useState({});
    const [loading, setLoading] = useState();

    const addPolicy = useCallback(() => {
        if (useDummyData) {
            const newPolicy = {
                id: Date.now(),
                ...policy,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            showToast({ severity: "success", summary: "Added", detail: "Policy Added", life: 1000 });
            setPolicies((prev) => [newPolicy, ...prev]);
            setPolicy({});
            closeDialog();
            return;
        }
        requestAPI({
            requestPath: `policies`,
            requestMethod: "POST",
            requestPostBody: policy,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Policy !", life: 2000 }),
            onResponseReceieved: (newPolicy, responseCode) => {
                if (newPolicy && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Policy Added", life: 1000 });
                    setPolicies((prev) => [newPolicy, ...prev]);
                    setPolicy({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Policy !", life: 2000 });
            },
        });
    }, [closeDialog, policy, requestAPI, setPolicies, showToast, useDummyData]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Policy`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New Policy" highlights={["New Policy Can Be Added"]} />

            <FloatLabel className="mt-5">
                <InputText
                    value={policy?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setPolicy((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputTextarea
                    value={policy?.content || ""}
                    id="content"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setPolicy((prev) => ({ ...prev, content: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="content">Content</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Policy" severity="warning" loading={loading} onClick={addPolicy} />
        </Dialog>
    );
}
