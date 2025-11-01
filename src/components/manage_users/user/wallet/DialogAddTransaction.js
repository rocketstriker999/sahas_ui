import { Dialog } from "primereact/dialog";
import { useCallback, useMemo, useState } from "react";
import Detail from "../../../common/Detail";
import { Button } from "primereact/button";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { SelectButton } from "primereact/selectbutton";
import TabHeader from "../../../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { RUPEE } from "../../../../constants";
import { InputTextarea } from "primereact/inputtextarea";
import { useOutletContext } from "react-router-dom";

export default function DialogAddTransaction({ setWalletTransActions, currentBalance, visible, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const { userId } = useOutletContext();

    const [loading, setLoading] = useState();

    const [transaction, setTransaction] = useState();

    const addTransaction = useCallback(() => {
        requestAPI({
            requestPath: `wallet-transactions`,
            requestMethod: "POST",
            requestPostBody: { ...transaction, user_id: userId, amount: transaction?.operation === "Credit" ? transaction?.amount : -transaction?.amount },
            setLoading: setLoading,
            onResponseReceieved: (walletTransaction, responseCode) => {
                if (walletTransaction && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Transaction Added", life: 1000 });
                    setWalletTransActions((prev) => [walletTransaction, ...prev]);
                    setTransaction(); //reset this form
                    closeDialog(); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Transaction !", life: 2000 });
                }
            },
        });
    }, [closeDialog, requestAPI, setWalletTransActions, showToast, transaction, userId]);

    const newWalletBalance = useMemo(() => {
        if (transaction?.operation && transaction?.amount) {
            return currentBalance + (transaction?.operation === "Credit" ? transaction?.amount : -transaction?.amount);
        }
        return currentBalance;
    }, [transaction?.amount, transaction?.operation, currentBalance]);

    return (
        <Dialog header={"Add New Transaction"} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader
                className="pt-3"
                title="Requred Information - New Transaction"
                highlights={[`Credit Will Add Amount to Wallet`, "Withdraw Will Immidiatly Deduct Amount"]}
            />

            <div className="flex  align-items-center mt-5 ">
                <Detail className="flex-1" title="New Wallet" value={`${newWalletBalance} ${RUPEE}`} icon={"pi pi-wallet"} />
                <SelectButton
                    value={transaction?.operation}
                    onChange={(e) => setTransaction((prev) => ({ ...prev, operation: e.value }))}
                    options={["Credit", "Withdraw"]}
                />
            </div>

            <FloatLabel className="mt-5">
                <div className="p-inputgroup flex-1">
                    <InputNumber
                        value={transaction?.amount}
                        id="amount"
                        className="w-full"
                        onChange={(e) =>
                            setTransaction((prev) => ({
                                ...prev,
                                amount: e.value,
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
                    id="note"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, note: e.target.value }))}
                />
                <label htmlFor="note">Note</label>
            </FloatLabel>

            <Button className="mt-3" label={"Apply"} severity="warning" loading={loading} onClick={addTransaction} />
        </Dialog>
    );
}
