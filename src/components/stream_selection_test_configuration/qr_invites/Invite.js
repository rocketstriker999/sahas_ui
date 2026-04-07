import QRCode from "react-qr-code";
import { getReadableDate } from "../../../utils";
import ProgressiveControl from "../../common/ProgressiveControl";
import { useCallback, useState } from "react";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";
import IconButton from "../../common/IconButton";
import { ICON_SIZE, TEXT_BADGE, TEXT_LARGE, TEXT_SMALL } from "../../../style";
import { useAppContext } from "../../../providers/ProviderAppContainer";

export default function Invite({ id, title, active, updated_at, setDialogEditInvite, setStreamSelectionTestInvites }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const deleteInvite = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-test-invites/${id}`,
            requestMethod: "DELETE",
            setLoading,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Psychometric Test invite Deleted", life: 1000 });
                    setStreamSelectionTestInvites((prev) => prev?.filter((invite) => invite?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Psychometric Test Invite !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setStreamSelectionTestInvites, showToast]);

    return (
        <div className="flex gap-2">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <div className="flex gap-3 align-items-center">
                    <span className={`font-semibold ${TEXT_LARGE}`}>
                        {id}. Venue - {title}
                    </span>
                </div>
                <div className={`flex align-items-center gap-1 ${TEXT_SMALL}`}>
                    <span className="pi pi-calendar" />
                    <span>{getReadableDate({ date: updated_at })}</span>
                </div>
                <div className="flex gap-2 align-items-center">
                    <span className={`${TEXT_BADGE} font-semibold ${!!active ? "text-green-800" : "text-red-500"}`}>{!!active ? "Active" : "Inactive"}</span>
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_STREAM_SELECTION_TEST_INVITE}>
                        <IconButton
                            icon={`pi-pencil`}
                            color={"text-orange-500"}
                            onClick={() =>
                                setDialogEditInvite((prev) => ({
                                    ...prev,
                                    visible: true,
                                    setStreamSelectionTestInvites,
                                    id,
                                    title,
                                    active,
                                }))
                            }
                        />
                    </HasRequiredAuthority>
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.DELETE_STREAM_SELECTION_TEST_INVITE}>
                        <ProgressiveControl
                            loading={loading}
                            control={<IconButton icon={"pi-trash"} color={"text-red-500"} className={ICON_SIZE} onClick={deleteInvite} />}
                        />
                    </HasRequiredAuthority>
                </div>
            </div>
            <QRCode size={88} value={JSON.stringify({ id })} />
        </div>
    );
}
