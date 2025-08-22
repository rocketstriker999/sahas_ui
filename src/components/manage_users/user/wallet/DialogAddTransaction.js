import { Dialog } from "primereact/dialog";
import { useCallback, useState } from "react";
import Detail from "../../../common/Detail";
import { Button } from "primereact/button";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { SelectButton } from "primereact/selectbutton";
import TabHeader from "../../../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { RUPEE } from "../../../../constants";
import { InputTextarea } from "primereact/inputtextarea";

export default function DialogAddTransaction({ userId, balance, setWalletTransActions, addingTransaction, setAddingTransaction }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const [transaction, setTransaction] = useState({ newBalance: balance });

    const getAmountByOperation = useCallback((operation, amount) => (operation === "Credit" ? amount : -amount), []);

    const addTransaction = useCallback(() => {
        requestAPI({
            requestPath: `users/${userId}/wallet-transactions`,
            requestMethod: "POST",
            requestPostBody: { amount: getAmountByOperation(transaction?.operation, transaction?.amount), note: transaction?.note },
            setLoading: setLoading,
            onResponseReceieved: (walletTransaction, responseCode) => {
                if (walletTransaction && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Transaction Added", life: 1000 });
                    setWalletTransActions((prev) => {
                        prev.balance = transaction?.newBalance;
                        prev.transactions = [walletTransaction, ...prev?.transactions];
                        return prev;
                    });
                    setTransaction((prev) => ({
                        newBalance: prev.newBalance,
                    })); //reset this form
                    setAddingTransaction(() => false); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Transaction !", life: 2000 });
                }
            },
        });
    }, [getAmountByOperation, requestAPI, setAddingTransaction, setWalletTransActions, showToast, transaction, userId]);

    return (
        <Dialog header={"Add New Transaction"} visible={addingTransaction} className="w-11" onHide={() => setAddingTransaction(false)}>
            <TabHeader
                className="pt-3"
                title="Requred Information - New Transaction"
                highlights={[`Credit Will Add Amount to Wallet`, "Withdraw Will Immidiatly Deduct Amount"]}
            />

            <div className="flex  align-items-center mt-5 ">
                <Detail className="flex-1" title="New Wallet" value={`${transaction?.newBalance} ${RUPEE}`} icon={"pi pi-wallet"} />
                <SelectButton
                    value={transaction?.operation}
                    onChange={(e) =>
                        setTransaction((prev) => {
                            if (prev?.amount) {
                                prev.newBalance = balance + getAmountByOperation(e.value, prev.amount);
                            }
                            return { ...prev, operation: e.value };
                        })
                    }
                    options={["Credit", "Withdraw"]}
                />
            </div>

            <FloatLabel className="mt-5">
                <div className="p-inputgroup flex-1">
                    <InputNumber
                        value={transaction?.amount}
                        id="amount"
                        className="w-full"
                        disabled={!transaction?.operation}
                        onChange={(e) =>
                            setTransaction((prev) => ({
                                ...prev,
                                amount: e.value,
                                newBalance: balance + getAmountByOperation(prev?.operation, e.value),
                            }))
                        }
                    />
                    <span className="p-inputgroup-addon">{RUPEE}</span>
                </div>

                <label htmlFor="amount">Amount</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputTextarea
                    value={transaction?.note}
                    disabled={!transaction?.operation}
                    id="note"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, note: e.target.value }))}
                />
                <label htmlFor="note">Note</label>
            </FloatLabel>

            <Button
                className="mt-3"
                disabled={!transaction?.operation || !transaction?.amount || !transaction?.note}
                label={"Apply"}
                severity="warning"
                loading={loading}
                onClick={addTransaction}
            />
        </Dialog>
    );
}
