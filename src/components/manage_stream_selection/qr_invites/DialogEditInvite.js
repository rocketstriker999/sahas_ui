import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import CheckboxInput from "../../common/CheckBoxInput";

export default function DialogEditInvite({ visible, setStreamSelectionTestInvites, closeDialog, ...props }) {
    const { requestAPI, showToast } = useAppContext();
    const [invite, setInvite] = useState(props);
    const [loading, setLoading] = useState();

    const editInvite = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-test-invites`,
            requestMethod: "PATCH",
            requestPostBody: invite,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Invite !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedInvite }, responseCode) => {
                if (updatedInvite && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Invite Updated", life: 1000 });
                    setStreamSelectionTestInvites((prev) => prev?.map((p) => (p?.id === props?.id ? updatedInvite : p)));
                    setInvite({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Updated Invite !", life: 2000 });
            },
        });
    }, [closeDialog, invite, props?.id, requestAPI, setStreamSelectionTestInvites, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Invite`} visible={visible} className="w-11" onHide={closeDialog}>
            <FloatLabel className="mt-5">
                <InputText
                    value={invite?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setInvite((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <CheckboxInput
                className={"mt-3"}
                label={"Active"}
                checked={!!invite?.active}
                onChange={(checked) => setInvite((prev) => ({ ...prev, active: checked }))}
            />

            <Button className="mt-3" label="Edit Invite" severity="warning" loading={loading} onClick={editInvite} />
        </Dialog>
    );
}
