import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

export default function DialogEditPolicy({ visible, setPolicies, closeDialog, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [policy, setPolicy] = useState(props);
    const [loading, setLoading] = useState();

    const editPolicy = useCallback(() => {
        requestAPI({
            requestPath: `policies/${props?.id}`,
            requestMethod: "PATCH",
            requestPostBody: policy,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Policy !", life: 2000 }),
            onResponseReceieved: (updatedPolicy, responseCode) => {
                if (updatedPolicy && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Policy Updated", life: 1000 });
                    setPolicies((prev) => prev?.map((p) => (p?.id === props?.id ? updatedPolicy : p)));
                    setPolicy({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Policy !", life: 2000 });
            },
        });
    }, [closeDialog, policy, props, requestAPI, setPolicies, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Policy`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Edit Policy" />

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

            <Button className="mt-3" label="Edit Policy" severity="warning" loading={loading} onClick={editPolicy} />
        </Dialog>
    );
}
