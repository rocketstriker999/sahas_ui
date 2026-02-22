import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import ProgressiveControl from "../common/ProgressiveControl";
import Detail from "../common/Detail";
import { Button } from "primereact/button";
import DialogEditPolicy from "./DialogEditPolicy";

export default function PolicyBody({ id, title, content, created_at, updated_at, setPolicies, useDummyData }) {
    const { requestAPI, showToast } = useAppContext();
    const [deleting, setDeleting] = useState();
    const [dialogEditPolicy, setDialogEditPolicy] = useState({ visible: false });

    const closeDialogEditPolicy = useCallback(() => {
        setDialogEditPolicy((prev) => ({ ...prev, visible: false }));
    }, []);

    const deletePolicy = useCallback(() => {
        if (useDummyData) {
            showToast({ severity: "success", summary: "Deleted", detail: "Policy Deleted", life: 1000 });
            setPolicies((prev) => prev?.filter((policy) => policy?.id !== id));
            return;
        }
        requestAPI({
            requestPath: `policies/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Policy Deleted", life: 1000 });
                    setPolicies((prev) => prev?.filter((policy) => policy?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Policy !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setPolicies, showToast, useDummyData]);

    return (
        <div className="flex gap-2 align-items-center justify-content-end">
            <Detail className="flex-1" title="Content" value={content} />

            <ProgressiveControl
                loading={false}
                control={
                    <Button
                        className="w-2rem h-2rem"
                        icon="pi pi-pencil"
                        rounded
                        severity="warning"
                        onClick={() =>
                            setDialogEditPolicy((prev) => ({
                                ...prev,
                                visible: true,
                                setPolicies,
                                useDummyData,
                                id,
                                title,
                                content,
                                created_at,
                                updated_at,
                                closeDialog: closeDialogEditPolicy,
                            }))
                        }
                    />
                }
            />

            <ProgressiveControl
                loading={deleting}
                control={<Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={deletePolicy} />}
            />
            {dialogEditPolicy?.visible && <DialogEditPolicy {...dialogEditPolicy} />}
        </div>
    );
}
