import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import TabHeader from "../../../common/TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { EMPTY_VALUE } from "../../../../constants";

export default function DialogAddTransaction({ selectedEnrollmentForTransaction, setSelectedEnrollmentForTransaction, setEnrollments, paymentTypes }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const [transaction, setTransaction] = useState();

    const addTransaction = useCallback(() => {
        requestAPI({
            requestPath: `enrollments/${selectedEnrollmentForTransaction}/transactions`,
            requestMethod: "POST",
            requestPostBody: { ...transaction, note: transaction?.note || EMPTY_VALUE },
            setLoading: setLoading,
            onResponseReceieved: (transactions, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Transaction Added", life: 1000 });

                    setEnrollments((prev) =>
                        prev?.map((enrollment) => {
                            if (enrollment.id === selectedEnrollmentForTransaction) {
                                enrollment.transactions = transactions;
                            }
                            return enrollment;
                        })
                    );

                    setTransaction(); //reset this form
                    setSelectedEnrollmentForTransaction(() => false); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Transaction !", life: 2000 });
                }
            },
        });
    }, [requestAPI, selectedEnrollmentForTransaction, setEnrollments, setSelectedEnrollmentForTransaction, showToast, transaction]);

    return (
        <Dialog
            header={`Add New Transaction`}
            visible={selectedEnrollmentForTransaction}
            className="w-11"
            onHide={() => setSelectedEnrollmentForTransaction(false)}
        >
            <TabHeader
                className="pt-3"
                title="Add New Course To Enrollment"
                highlights={["Transaction Will be Recorded immidiatly", "Transaction Is Irreversible"]}
            />

            <FloatLabel className="mt-5">
                <InputNumber
                    value={transaction?.amount}
                    id="amount"
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, amount: e.value }))}
                />
                <label htmlFor="amount">Amount</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <Dropdown
                    value={transaction?.type}
                    inputId="types"
                    options={paymentTypes}
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, type: e.value }))}
                    disabled={loading}
                />
                <label htmlFor="types">Type</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputTextarea
                    value={transaction?.note}
                    id="note"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, note: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="note">Note</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Transaction" severity="warning" loading={loading} onClick={addTransaction} />
        </Dialog>
    );
}
