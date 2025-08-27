import Detail from "../../../common/Detail";
import { RUPEE } from "../../../../constants";
import { getReadableDate } from "../../../../utils";

export default function Transaction({ index, amount, created_by_full_name, note, created_on }) {
    return (
        <div className="flex align-items-start gap-2 mb-2">
            <Detail className="flex-1 mb-2" title={`${index}. By ${created_by_full_name} at ${getReadableDate({ date: created_on })}`} more={note} />

            <div className="flex justify-content-center align-items-center gap-2">
                <span className="font-semibold">{`${amount} ${RUPEE}`}</span>
                <i className="pi pi-file-pdf font-semibold text-red-500"></i>
            </div>
        </div>
    );
}
