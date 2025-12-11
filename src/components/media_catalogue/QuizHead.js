import { Button } from "primereact/button";
import { AUTHORITIES } from "../../constants";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { useOutletContext } from "react-router-dom";
import { useCallback, useState } from "react";
import DialogEditQuizConfig from "./DialogEditQuizConfig";

export default function QuizHead() {
    const { course } = useOutletContext();

    const [dialogEditQuizConfig, setDialogEditQuizConfig] = useState({
        visible: false,
    });

    const closeDialogEditQuizConfig = useCallback(() => {
        setDialogEditQuizConfig((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        !!course?.enrollment?.digital_access && (
            <div className="flex align-items-center gap-2 p-2">
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                    <Button
                        severity="warning"
                        onClick={() => {
                            // setDialogEditQuizConfig((prev) => ({
                            //     ...prev,
                            //     visible: true,
                            //     subject,
                            //     setSubject,
                            // }));
                        }}
                        icon="pi pi-pencil"
                    />
                </HasRequiredAuthority>

                <Button disabled={true} className="flex-1" onClick={() => {}} label="Launch Quiz" iconPos="right" icon="pi pi-question-circle" />
                <Button severity="warning" disabled={true} onClick={() => {}} icon="pi pi-history" />

                {dialogEditQuizConfig?.visible && <DialogEditQuizConfig {...dialogEditQuizConfig} closeDialog={closeDialogEditQuizConfig} />}
            </div>
        )
    );
}
