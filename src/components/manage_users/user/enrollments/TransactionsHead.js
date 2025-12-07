import { Badge } from "primereact/badge";
import { TEXT_SIZE_SMALL } from "../../../../style";

export default function TransactionsHead({ selected, onClick, totalTransactions }) {
    return (
        <div
            className={`flex justify-content-center align-items-center gap-2 p-3 ${selected && "border-bottom-2 bg-gray-100"} `}
            style={{ cursor: "pointer" }}
            onClick={onClick}
        >
            <Badge value={totalTransactions} />
            <span className={`${TEXT_SIZE_SMALL} font-bold white-space-nowrap`}>Transactions</span>
            <i className={`${TEXT_SIZE_SMALL} pi pi-indian-rupee`}></i>
        </div>
    );
}
