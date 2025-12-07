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
import { useOutletContext } from "react-router-dom";
import { TEXT_SIZE_SMALL, TEXT_SIZE_NORMAL, TITLE_TEXT } from "../../../../style";
import FileInput from "../../../common/FileInput";

export default function DialogAddTransaction({ visible, enrollment_id, setTransactions, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();
    const { paymentTypes } = useOutletContext();

    const [loading, setLoading] = useState();
    const [transaction, setTransaction] = useState();

    const addTransaction = useCallback(() => {
        requestAPI({
            requestPath: `enrollment-transactions`,
            requestMethod: "POST",
            requestPostBody: { ...transaction, note: transaction?.note || EMPTY_VALUE, enrollment_id },
            setLoading: setLoading,
            onResponseReceieved: (transaction, responseCode) => {
                if (transaction && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Transaction Added", life: 1000 });
                    setTransactions((prev) => [transaction, ...prev]);
                    setTransaction(); //reset this form
                    closeDialog(); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Transaction !", life: 2000 });
                }
            },
        });
    }, [closeDialog, enrollment_id, requestAPI, setTransactions, showToast, transaction]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Transaction`} visible={visible} className="w-11" onHide={closeDialog}
            pt={{
                headertitle: { className: TITLE_TEXT },
            }}>
            <TabHeader
                className="pt-3"
                title="Add New Transcation To Enrollment"
                highlights={["Transaction Will be Recorded immidiatly", "Transaction Is Irreversible"]}
            />

            <FloatLabel className="mt-5">
                <InputNumber
                    value={transaction?.amount}
                    id="amount"
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, amount: e.value }))}
                />
                <label htmlFor="amount" className={`${TEXT_SIZE_SMALL}`}>Amount</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <Dropdown
                    value={transaction?.type}
                    inputId="types"
                    options={paymentTypes}
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, type: e.value }))}
                    disabled={loading}
                    pt={{
                        input: { className: TEXT_SIZE_NORMAL },
                        item: { className: TEXT_SIZE_NORMAL },
                    }}
                />
                <label htmlFor="types" className={`${TEXT_SIZE_SMALL}`}>Type</label>
            </FloatLabel>

            <FileInput
                className={"mt-3"}
                label="Product Category"
                type="image"
                cdn_url={transaction?.image}
                setCDNUrl={(cdn_url) => setTransaction((prev) => ({ ...prev, image: cdn_url }))}
                disabled={loading}
            />

            <FloatLabel className="mt-5">
                <InputTextarea
                    value={transaction?.note}
                    id="note"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setTransaction((prev) => ({ ...prev, note: e.target.value }))}
                    disabled={loading}
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                />
                <label htmlFor="note" className={`${TEXT_SIZE_SMALL}`}>Note</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Transaction" severity="warning" loading={loading} onClick={addTransaction}
                pt={{
                    label: { className: TEXT_SIZE_NORMAL },
                    icon: { className: TEXT_SIZE_NORMAL }
                }} />
        </Dialog>
    );
}
