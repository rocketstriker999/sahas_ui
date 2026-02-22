import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { AccordionTab } from "primereact/accordion";
import { getReadableDate } from "../../utils";
import ProgressiveControl from "../common/ProgressiveControl";
import Detail from "../common/Detail";
import { Button } from "primereact/button";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../style";
import DialogEditPolicy from "./DialogEditPolicy";

export default function Policy({ id, title, content, created_at, updated_at, index, setPolicies, useDummyData }) {
    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();
    const [dialogEditPolicy, setDialogEditPolicy] = useState({
        visible: false,
    });

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

    const header = (
        <div className="flex align-items-center">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <p className={`m-0 p-0 ${TEXT_SIZE_NORMAL}`}>
                    {index}. {title}
                </p>
                {created_at && (
                    <p className={`${TEXT_SIZE_SMALL} m-0 p-0 font-medium text-color-secondary`}>
                        <i className={`${TEXT_SIZE_SMALL} pi pi-calendar`}></i> Updated at {getReadableDate({ date: updated_at || created_at })}
                    </p>
                )}
            </div>
        </div>
    );

    const body = (
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

    return <AccordionTab header={header}>{body}</AccordionTab>;
}
