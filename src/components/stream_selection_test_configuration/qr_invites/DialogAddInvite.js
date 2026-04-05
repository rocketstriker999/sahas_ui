import { useCallback, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import CheckboxInput from "../../common/CheckBoxInput";

export default function DialogAddInvite({ visible, setStreamSelectionTestInvites, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [invite, setInvite] = useState({ active: false });
    const [loading, setLoading] = useState();

    const addInvite = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-test-invites`,
            requestMethod: "POST",
            requestPostBody: invite,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Invite !", life: 2000 }),
            onResponseReceieved: ({ error, ...invite }, responseCode) => {
                if (invite && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Invite Added", life: 1000 });
                    setStreamSelectionTestInvites((prev) => [invite, ...prev]);
                    setInvite({});
                    closeDialog();
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Add Invite !", life: 2000 });
            },
        });
    }, [closeDialog, invite, requestAPI, setStreamSelectionTestInvites, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Invite`} visible={visible} className="w-11" onHide={closeDialog}>
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

            <Button className="mt-3" label="Add Question" severity="warning" loading={loading} onClick={addInvite} />
        </Dialog>
    );
}
