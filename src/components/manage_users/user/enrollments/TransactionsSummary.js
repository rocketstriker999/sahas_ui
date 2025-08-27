import { Badge } from "primereact/badge";
import Detail from "../../../common/Detail";
import { RUPEE } from "../../../../constants";

export default function TransactionsSummary({ fees, paid, due }) {
    return (
        <div className="flex align-items-center justify-content-evenly pb-2">
            <Detail title="Fees" className="text-center" value={<Badge value={`${parseFloat(fees)} ${RUPEE}`} severity="warning"></Badge>} />
            <Detail title="Paid" className="text-center" value={<Badge value={`${paid} ${RUPEE}`} severity="success"></Badge>} />
            <Detail title="Due" className="text-center" value={<Badge value={`${due} ${RUPEE}`} severity="danger"></Badge>} />
        </div>
    );
}
