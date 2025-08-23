import { Divider } from "primereact/divider";
import TabHeader from "../../common/TabHeader";
import { Button } from "primereact/button";
import { RUPEE } from "../../../constants";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import { useOutletContext } from "react-router-dom";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";

import Transactions from "./wallet/Transaction";
import DialogAddTransaction from "./wallet/DialogAddTransaction";

export default function Wallet() {
    const { userId } = useOutletContext();

    const { requestAPI, showToast } = useAppContext();

    const [addingTransaction, setAddingTransaction] = useState();

    const [walletTransActions, setWalletTransActions] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}/wallet-transactions`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (walletTransActions, responseCode) => {
                if (walletTransActions && responseCode === 200) {
                    setWalletTransActions(walletTransActions);
                } else {
                    setError("Couldn't load Wallet Transactions");
                }
            },
        });
    }, [requestAPI, userId]);

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader
                className={"px-3 pt-3"}
                title={`User's Wallet - ${walletTransActions?.balance} ${RUPEE}`}
                highlights={[`Total - ${walletTransActions?.transactions?.length} Transactions`]}
                actionItems={[<Button icon="pi pi-plus" severity="warning" onClick={setAddingTransaction} />]}
            />
            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Wallet Transactions" />
                ) : error ? (
                    <NoContent error={error} />
                ) : walletTransActions?.transactions?.length ? (
                    walletTransActions.transactions?.map((transaction, index) => (
                        <Transactions index={walletTransActions?.transactions?.length - 1} key={transaction?.id} {...transaction} />
                    ))
                ) : (
                    <NoContent error={"No Wallet Transactions Found"} />
                )}
            </div>

            {walletTransActions && (
                <DialogAddTransaction
                    userId={userId}
                    balance={Number(walletTransActions?.balance)}
                    setWalletTransActions={setWalletTransActions}
                    addingTransaction={addingTransaction}
                    setAddingTransaction={setAddingTransaction}
                />
            )}
        </div>
    );
}
