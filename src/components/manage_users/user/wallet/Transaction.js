import { Tag } from "primereact/tag";
import { RUPEE } from "../../../../constants";
import { getReadableDate } from "../../../../utils";
import Detail from "../../../common/Detail";

export default function Transactions({ amount, note, created_on, created_by, created_by_full_name }) {
    return (
        <div className="flex align-items-center gap-2 mb-2">
            <Detail
                icon="pi pi-angle-right"
                className="flex-1 mb-2"
                title={`By ${created_by ? created_by_full_name : "System"} at ${getReadableDate({ date: created_on })}`}
                value={note}
            />
            <Tag value={`  ${amount > 0 ? `+${amount}` : amount} ${RUPEE}`} severity={amount > 0 ? "success" : "danger"} />
        </div>
    );
}
