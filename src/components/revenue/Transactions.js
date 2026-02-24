import { useEffect, useState } from "react";
import Transaction from "./Transaction";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";

export default function Transactions({ dates }) {
    const [loading, setLoading] = useState();
    const [transactions, setTransactions] = useState();

    const { requestAPI, showToast } = useAppContext();

    useEffect(() => {
        if (dates)
            requestAPI({
                requestMethod: "GET",
                requestPath: `enrollment-transactions`,
                requestGetQuery: {
                    start_date: dates[0],
                    end_date: dates[1],
                },
                setLoading: setLoading,
                onResponseReceieved: (transactions, responseCode) => {
                    if (transactions && responseCode === 200) setTransactions(transactions);
                    else showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Transactions !", life: 2000 });
                },
            });
    }, [dates, requestAPI, showToast]);

    if (loading) {
        return <Loading message={"Fetching Transactions"} />;
    }

    return transactions?.length ? (
        <div className="flex-1 p-2 flex flex-column gap-2 overflow-y-scroll">
            {transactions?.map((transaction) => (
                <Transaction setTransactions={setTransactions} key={transaction?.id} {...transaction} />
            ))}
        </div>
    ) : (
        <NoContent />
    );
}
