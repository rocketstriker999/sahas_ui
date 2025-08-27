import TabHeader from "../../../common/TabHeader";
import { Tag } from "primereact/tag";
import TransactionsSummary from "./TransactionsSummary";
import { useEffect, useMemo, useState } from "react";
import Transaction from "./Transaction";
import NoContent from "../../../common/NoContent";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import Loading from "../../../common/Loading";

export default function TransactionsTabBody({ fees, id, setTotalTransactions }) {
    const [transactions, setTransactions] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `enrollments/${id}/transactions`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (transactions, responseCode) => {
                if (transactions && responseCode === 200) {
                    setTransactions(transactions);
                } else {
                    setError("Couldn't load Enrollments");
                }
            },
        });
    }, [id, requestAPI]);

    useEffect(() => {
        setTotalTransactions(() => transactions?.length);
    }, [setTotalTransactions, transactions]);

    const [paid, due] = useMemo(() => {
        const paid = transactions?.reduce((sum, transaction) => sum + parseFloat(transaction?.amount), 0);
        const due = parseFloat(fees) - paid;
        return [paid, due];
    }, [fees, transactions]);

    return (
        <div className="flex flex-column gap-3">
            <TabHeader
                title="Enrollment Transactions"
                highlights={[`Total - ${transactions?.length} Transactions`]}
                actionItems={[
                    <Tag
                        key="transactions-tag"
                        icon="pi pi-indian-rupee"
                        value="Add Transcations"
                        // onClick={() => setSelectedEnrollmentForTransaction(enrollment?.id)}
                    ></Tag>,
                ]}
            />

            <TransactionsSummary paid={paid} due={due} fees={fees} />

            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : transactions?.length ? (
                transactions?.map((transaction, index) => <Transaction index={index + 1} key={transaction?.id} {...transaction} />)
            ) : (
                <NoContent error="No Transactions Found" />
            )}
        </div>
    );
}
