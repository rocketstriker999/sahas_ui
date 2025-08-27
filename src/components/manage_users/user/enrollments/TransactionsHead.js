import { Badge } from "primereact/badge";

export default function TransactionsHead({ selected, onClick, totalTransactions }) {
    return (
        <div
            className={`flex justify-content-center align-items-center gap-2 p-3 ${selected && "border-bottom-2 bg-gray-100"} `}
            style={{ cursor: "pointer" }}
            onClick={onClick}
        >
            <Badge value={totalTransactions} />
            <span className="font-bold white-space-nowrap">Transactions</span>
            <i className="pi pi-indian-rupee"></i>
        </div>
    );
}
