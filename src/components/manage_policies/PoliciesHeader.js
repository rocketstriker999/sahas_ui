import { useCallback, useState } from "react";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import DialogAddPolicy from "./DialogAddPolicy";

export default function PoliciesHeader({ policies, setPolicies }) {
    const [dialogAddPolicy, setDialogAddPolicy] = useState({
        visible: false,
    });

    const closeDialogAddPolicy = useCallback(() => {
        setDialogAddPolicy((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div>
            <TabHeader
                className={"px-3 pt-3"}
                title="Manage Policies"
                highlights={[`Add/Edit/Delete Policy`, `Total - ${policies?.length || 0} Policies`]}
                actionItems={[
                    <Button
                        icon="pi pi-plus"
                        severity="warning"
                        onClick={() =>
                            setDialogAddPolicy((prev) => ({
                                ...prev,
                                setPolicies,
                                visible: true,
                                closeDialog: closeDialogAddPolicy,
                            }))
                        }
                    />,
                ]}
            />
            {dialogAddPolicy?.visible && <DialogAddPolicy {...dialogAddPolicy} />}
        </div>
    );
}
