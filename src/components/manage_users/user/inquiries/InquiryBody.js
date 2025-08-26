import { useOutletContext } from "react-router-dom";
import Detail from "../../../common/Detail";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { useCallback, useState } from "react";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import DialogManageInquiryNotes from "./DialogManageInquiryNotes";

import { InputSwitch } from "primereact/inputswitch";
import ProgressiveControl from "../../../common/ProgressiveControl";

export default function InquiryBody({ setInquiries, ...props }) {
    const { branches } = useOutletContext();
    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();
    const [updating, setUpdating] = useState();
    const [notesCount, setNotesCount] = useState(props?.notes_count);

    const [dialogManageInquiryNotes, setDialogManageInquiryNotes] = useState();

    const deleteInquiry = useCallback(() => {
        requestAPI({
            requestPath: `inquiries/${props?.id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Updated", detail: "Inquiry Deleted", life: 1000 });
                    setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== props?.id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Inquiry !", life: 2000 });
                }
            },
        });
    }, [props?.id, requestAPI, setInquiries, showToast]);

    const updateInquiry = useCallback(
        (updateKeys) => {
            requestAPI({
                requestPath: `inquiries`,
                requestMethod: "PATCH",
                requestPostBody: { ...props, ...updateKeys },
                setLoading: setUpdating,
                onResponseReceieved: (updatedInquiry, responseCode) => {
                    if (responseCode === 200) {
                        showToast({ severity: "success", summary: "Updated", detail: "Inquiry Updated", life: 1000 });
                        setInquiries((prev) => prev.map((inquiry) => (inquiry?.id === props?.id ? updatedInquiry : inquiry)));
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Inquiry !", life: 2000 });
                    }
                },
            });
        },
        [props, requestAPI, setInquiries, showToast]
    );

    return (
        <div className="flex gap-2 align-items-center justify-content-end">
            <Detail className="flex-1" title="Branch" value={branches?.find((branch) => branch.id === props?.branch_id)?.title} />

            <ProgressiveControl
                loading={updating}
                control={<InputSwitch checked={Boolean(props?.active)} onChange={(e) => updateInquiry({ active: e.value })} />}
            />

            <ProgressiveControl
                loading={deleting}
                control={<Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={deleteInquiry} />}
            />

            <div className="p-overlay-badge">
                <Button
                    className="w-2rem h-2rem"
                    icon="pi pi-clipboard"
                    rounded
                    severity="warning"
                    onClick={() =>
                        setDialogManageInquiryNotes({
                            visible: true,
                            inquiry_id: props?.id,
                            course_id: props?.course_id,
                            closeDialog: setDialogManageInquiryNotes,
                            setInquiries,
                        })
                    }
                />
                <Badge value={notesCount} severity="secondary"></Badge>
            </div>

            <DialogManageInquiryNotes updateNotesCount={(newNotesCount) => setNotesCount(() => newNotesCount)} {...dialogManageInquiryNotes} />
        </div>
    );
}
