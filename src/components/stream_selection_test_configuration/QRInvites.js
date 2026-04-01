import { Button } from "primereact/button";
import { AUTHORITIES } from "../../constants";
import TabHeader from "../common/TabHeader";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { Divider } from "primereact/divider";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import DialogAddInvite from "./qr_invites/DialogAddInvite";
import { Accordion, AccordionTab } from "primereact/accordion";
import QRCode from "react-qr-code";
import { getReadableDate } from "../../utils";
import Invite from "./qr_invites/Invite";

export default function QRInvites() {
    const [loading, setLoading] = useState();
    const { requestAPI, showToast } = useAppContext();
    const [streamSelectionTestInvites, setStreamSelectionTestInvites] = useState();

    const [dialogEditInvite, setDialogEditInvite] = useState({ visible: false });

    const [dialogAddInvite, setDialogAddInvite] = useState({
        visible: false,
    });

    const closeDialogAddInvite = useCallback(() => {
        setDialogAddInvite((prev) => ({ ...prev, visible: false }));
    }, []);

    const closeDialogEditQuestion = useCallback(() => {
        setDialogEditInvite((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: `stream-selection-test-invites`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (invites, responseCode) => {
                if (invites && responseCode === 200) {
                    setStreamSelectionTestInvites(invites);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Stream Selection Questions !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <TabHeader
                className={"mx-3 mt-2"}
                title="Q.R. Invite "
                highlights={[`Q.R. Invites AS Following`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_STREAM_SELECTION_TEST}>
                        <Button
                            icon="pi pi-plus"
                            severity="warning"
                            onClick={() =>
                                setDialogAddInvite((prev) => ({
                                    ...prev,
                                    setStreamSelectionTestInvites,
                                    visible: true,
                                    closeDialog: closeDialogAddInvite,
                                }))
                            }
                        />
                    </HasRequiredAuthority>,
                ]}
            />
            <Divider />

            <div className="flex-1 overflow-y-scroll px-2">
                <Accordion>
                    {streamSelectionTestInvites?.map((invite) => (
                        <AccordionTab header={invite?.title}>
                            <Invite setStreamSelectionTestInvites={setStreamSelectionTestInvites} {...invite} />
                        </AccordionTab>
                    ))}
                </Accordion>
            </div>

            {dialogAddInvite?.visible && <DialogAddInvite {...dialogAddInvite} />}
        </div>
    );
}

//  onClick={() =>
//                                 setDialogAddQuestion((prev) => ({
//                                     ...prev,
//                                     setQuestions,
//                                     visible: true,
//                                     closeDialog: closeDialogAddQuestion,
//                                 }))
//                             }
