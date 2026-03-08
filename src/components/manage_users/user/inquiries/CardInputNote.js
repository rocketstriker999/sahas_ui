import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useCallback, useState } from "react";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { TEXT_SIZE_NORMAL } from "../../../../style";
import HasRequiredAuthority from "../../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../../constants";

export default function CardInputNote({ inquiry_id, setNotes }) {
    const [note, setNote] = useState("");
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const addInquiryNote = useCallback(() => {
        requestAPI({
            requestPath: `inquiry-notes`,
            requestMethod: "POST",
            setLoading: setLoading,
            requestPostBody: { inquiry_id, note },
            onResponseReceieved: (note, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Inquiry Note Added", life: 1000 });
                    setNotes((prev) => [note, ...prev]);
                    setNote(() => "");
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Inquiry Note !", life: 2000 });
                }
            },
        });
    }, [inquiry_id, note, requestAPI, setNotes, showToast]);

    return (
        <div className="p-inputgroup ">
            <InputText disabled={loading} placeholder="Add Note" value={note} onChange={(e) => setNote(e.target.value)}
                pt={{
                    root: { className: TEXT_SIZE_NORMAL },
                }} />
            <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_INQUIRY_NOTE}>
                <Button loading={loading} icon="pi pi-plus" className="p-button-warning" onClick={addInquiryNote} disabled={!note?.length}
                    pt={{
                        icon: { className: TEXT_SIZE_NORMAL }
                    }} />
            </HasRequiredAuthority>
        </div>
    );
}
