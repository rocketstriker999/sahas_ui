import { useNavigate } from "react-router-dom";
import { RUPEE } from "../../constants";
import { getReadableDate } from "../../utils";
import { Tag } from "primereact/tag";
import CheckboxInput from "../common/CheckBoxInput";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import ProgressiveControl from "../common/ProgressiveControl";

export default function Transaction({ id, user_id, full_name, amount, courses, type, created_on, handler, manually_verified, setTransactions }) {
    const navigate = useNavigate();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const updateTransactionManualVerification = useCallback(
        (manualVerification) => {
            requestAPI({
                requestPath: `enrollment-transactions/manual-verification`,
                requestMethod: "PATCH",
                requestPostBody: { id, manually_verified: manualVerification },
                setLoading,
                parseResponseBody: false,
                onResponseReceieved: (updatedEnrollmentTransaction, responseCode) => {
                    if (updatedEnrollmentTransaction && responseCode === 200) {
                        showToast({ severity: "success", summary: "Updated", detail: "Enrollment Transcation Updated Succesfully", life: 1000 });
                        setTransactions((prev) =>
                            prev.map((enrollmentTransaction) =>
                                enrollmentTransaction?.id === id ? { ...enrollmentTransaction, manually_verified: manualVerification } : enrollmentTransaction,
                            ),
                        );
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Updated Enrollment Transcation !", life: 2000 });
                    }
                },
            });
        },
        [id, requestAPI, setTransactions, showToast],
    );

    return (
        <div className="border-1 border-gray-300 border-round">
            <div className="px-3 py-2  flex align-items-center gap-2  " onClick={() => navigate(`/manage-users/${user_id}/enrollments`)}>
                <div className="flex flex-column align-items-start gap-1 flex-1">
                    <span>
                        {id}. {full_name}
                    </span>
                    {handler && <Tag value={handler}></Tag>}
                    {courses?.map(({ title }) => (
                        <span key={title} className="text-xs text-color-secondary">
                            {title}
                        </span>
                    ))}
                </div>

                <div className="flex flex-column gap-2 align-items-end">
                    <span className="text-green-800 bg-green-100 px-2 py-1  border-1 border-round border-green-300">
                        + {amount}
                        {RUPEE}
                    </span>
                    <span className="border-1 text-xs px-1 border-orange-800 bg-orange-300 border-round text-orange-800 p-1">{type}</span>
                    <div className="flex align-items-center gap-1 text-color-secondary">
                        <span className="pi pi-calendar"></span>
                        <span className="text-xs ">{getReadableDate({ date: created_on })}</span>
                    </div>
                </div>
            </div>

            <ProgressiveControl
                control={
                    <CheckboxInput
                        checked={!!manually_verified}
                        onChange={updateTransactionManualVerification}
                        className={"text-sm text-gray-900 font-semibold"}
                        label={"Manually Verified"}
                    />
                }
                loading={loading}
            />
        </div>
    );
}
