import QRCode from "react-qr-code";
import { getReadableDate } from "../../../utils";
import ProgressiveControl from "../../common/ProgressiveControl";
import { useState } from "react";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";
import IconButton from "../../common/IconButton";
import { ICON_SIZE } from "../../../style";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

export default function Invite({ id, title, active, updated_at, setStreamSelectionTestInvites }) {
    const [loading, setLoading] = useState();

    return (
        <div className="flex gap-2">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <div className="flex gap-3 align-items-center">
                    <span className="font-semibold text-lg ">
                        {id}. Venue - {title}
                    </span>
                    <ProgressiveControl loading={loading} control={<Checkbox checked={!!active}></Checkbox>} />

                    <ProgressiveControl
                        loading={loading}
                        control={
                            <HasRequiredAuthority requiredAuthority={AUTHORITIES.DELETE_COURSE_CATEGORY}>
                                <IconButton icon={"pi-trash"} color={"text-red-500"} className={ICON_SIZE} />
                            </HasRequiredAuthority>
                        }
                    />
                </div>
                <div className="flex align-items-center text-xs gap-1">
                    <span className="pi pi-calendar" />
                    <span>{getReadableDate({ date: updated_at })}</span>
                </div>
                <Button label="Share" size="small" outlined icon="pi pi-share-alt" />
            </div>
            <QRCode size={88} value={JSON.stringify({ id })} />
        </div>
    );
}
