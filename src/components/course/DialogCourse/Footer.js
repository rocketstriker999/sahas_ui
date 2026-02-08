import { Button } from "primereact/button";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import { useCallback } from "react";

export default function Footer({ setCourse, dialog, dialogCourse, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const updateDialog = useCallback(() => {
        requestAPI({
            requestPath: `courses/dialog`,
            requestMethod: "PUT",
            requestPostBody: { ...dialog, course_id: dialogCourse?.courseId },
            setLoading: (updating) => setCourse((prev) => ({ ...prev, dialog: { ...prev?.dialog, updating } })),
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Dialog !", life: 2000 }),
            onResponseReceieved: ({ error, ...updatedDialog }, responseCode) => {
                if (updatedDialog && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Dialog Updated", life: 1000 });
                    setCourse((prev) => ({ ...prev, dialog: updatedDialog }));
                } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Update Dialog !", life: 2000 });
            },
        });
    }, [dialog, dialogCourse?.courseId, requestAPI, setCourse, showToast]);

    return dialogCourse?.editing ? (
        <div className="flex justify-content-between">
            <Button
                label="Back"
                icon="pi pi-arrow-left"
                onClick={() => setCourse((prev) => ({ ...prev, dialog: { ...prev?.dialog, editing: false } }))}
                severity="danger"
                autoFocus
                text
                loading={dialogCourse?.updating}
            />
            <Button label="Save" icon="pi pi-check" onClick={updateDialog} severity="success" outlined loading={dialogCourse?.updating} />
        </div>
    ) : (
        <div className="flex justify-content-between gap-2">
            <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSE_DIALOG}>
                <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    onClick={() => setCourse((prev) => ({ ...prev, dialog: { ...prev?.dialog, editing: true } }))}
                    severity="warning"
                    text
                />
            </HasRequiredAuthority>
            <Button label="Close" icon="pi pi-times" onClick={closeDialog} severity="danger" text />
            {dialogCourse?.redirect_url && (
                <Button
                    label="More"
                    icon="pi pi-external-link"
                    onClick={() => {
                        window.open(dialogCourse.redirect_url);
                    }}
                    autoFocus
                    link
                />
            )}
        </div>
    );
}
