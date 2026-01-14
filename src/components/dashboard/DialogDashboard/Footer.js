import { Button } from "primereact/button";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setDashboardDialog, updateDashboardDialog } from "../../../redux/sliceTemplateConfig";

export default function Footer({ dialog, dialogDashboard, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();
    const dispatch = useDispatch();

    const updateDialog = useCallback(() => {
        requestAPI({
            requestPath: `template-configs/dashboard/dialog`,
            requestMethod: "PUT",
            requestPostBody: dialog,
            setLoading: (updating) => dispatch(updateDashboardDialog({ updating })),
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Dialog !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedDialog }, responseCode) => {
                if (updatedDialog && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Dialog Updated", life: 1000 });
                    dispatch(setDashboardDialog(updatedDialog));
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Update Dialog !", life: 2000 });
            },
        });
    }, [dialog, dispatch, requestAPI, showToast]);

    return dialogDashboard?.editing ? (
        <div className="flex justify-content-between ">
            <Button
                label="Back"
                icon="pi pi-arrow-left"
                onClick={() => dispatch(updateDashboardDialog({ editing: false }))}
                severity="danger"
                autoFocus
                text
                loading={dialogDashboard?.updating}
            />
            <Button label="Save" icon="pi pi-check" onClick={updateDialog} severity="success" outlined loading={dialogDashboard?.updating} />
        </div>
    ) : (
        <div className="flex justify-content-between gap-2">
            <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_DASHBOARD_DIALOG}>
                <Button label="Edit" icon="pi pi-pencil" onClick={() => dispatch(updateDashboardDialog({ editing: true }))} severity="warning" text />
            </HasRequiredAuthority>
            <Button label="Close" icon="pi pi-times" onClick={closeDialog} severity="danger" text />
            {dialogDashboard?.redirect_url && (
                <Button
                    label="More"
                    icon="pi pi-external-link"
                    onClick={() => {
                        window.open(dialogDashboard.redirect_url);
                    }}
                    autoFocus
                    link
                />
            )}
        </div>
    );
}
