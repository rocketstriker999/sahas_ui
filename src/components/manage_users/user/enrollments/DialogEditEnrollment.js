import { Dialog } from "primereact/dialog";
import TabHeader from "../../../common/TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { TITLE_TEXT, TEXT_SIZE_SMALL } from "../../../../style";
import { getWriteableDate } from "../../../../utils";

export default function DialogEditEnrollment({ visible, closeDialog, setEnrollments, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const [enrollment, setEnrollment] = useState(props);

    const updateEnrollment = useCallback(() => {
        requestAPI({
            requestPath: `enrollments`,
            requestMethod: "PATCH",
            requestPostBody: {
                ...enrollment,
                start_date: getWriteableDate({ date: enrollment?.start_date, removeTime: true }),
                end_date: getWriteableDate({ date: enrollment?.end_date, removeTime: true }),
            },
            setLoading,
            onResponseReceieved: (updatedEnrollment, responseCode) => {
                if (updatedEnrollment && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Enrollment Updated Succesfully", life: 1000 });
                    setEnrollments((prev) => prev.map((enrollment) => (enrollment?.id === props?.id ? updatedEnrollment : enrollment)));
                    closeDialog();
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Updated Enrollment !", life: 2000 });
                }
            },
        });
    }, [closeDialog, enrollment, props, requestAPI, setEnrollments, showToast]);

    return (
        <Dialog
            header={`Edit Enrollment ${enrollment?.id}`}
            visible={visible}
            className="w-11"
            onHide={closeDialog}
            pt={{
                headertitle: { className: TITLE_TEXT },
                content: { className: "overflow-visible" },
            }}
        >
            <TabHeader className="pt-3" title="Edit Enrollment Below Details" />

            <FloatLabel className="mt-5">
                <Calendar
                    dateFormat="dd-mm-yy"
                    inputId="start_date"
                    className="w-full"
                    value={enrollment?.start_date}
                    onChange={(e) => setEnrollment((prev) => ({ ...prev, start_date: e.value }))}
                    disabled={loading}
                    showTime={false}
                    showIcon
                />
                <label htmlFor="start_date" className={`${TEXT_SIZE_SMALL}`}>
                    Start Date
                </label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <Calendar
                    dateFormat="dd/mm/yy"
                    inputId="end_date"
                    className="w-full"
                    value={enrollment?.end_date}
                    onChange={(e) => setEnrollment((prev) => ({ ...prev, end_date: e.value }))}
                    disabled={loading}
                    showTime={false}
                    showIcon
                />
                <label htmlFor="end_date" className={`${TEXT_SIZE_SMALL}`}>
                    End Date
                </label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputNumber
                    value={enrollment?.amount}
                    id="amount"
                    className="w-full"
                    onChange={(e) => setEnrollment((prev) => ({ ...prev, amount: e.value }))}
                    pt={{
                        root: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <label htmlFor="amount" className={`${TEXT_SIZE_SMALL}`}>
                    Total Amount
                </label>
            </FloatLabel>

            <div className="border-1 border-round border-gray-300 p-3 flex justify-content-between align-items-center mt-3 gap-3">
                <div className="flex align-items-center gap-2">
                    <label htmlFor="on_site_access" className={`${TEXT_SIZE_SMALL}`}>
                        On Site Access
                    </label>
                    <Checkbox
                        inputId="on_site_access"
                        onChange={({ checked }) => setEnrollment((prev) => ({ ...prev, on_site_access: checked }))}
                        checked={!!enrollment?.on_site_access}
                    />
                </div>

                <div className="flex align-items-center gap-2">
                    <label htmlFor="digital_access" className={`${TEXT_SIZE_SMALL}`}>
                        Digital Access
                    </label>
                    <Checkbox
                        inputId="digital_access"
                        onChange={({ checked }) => setEnrollment((prev) => ({ ...prev, digital_access: checked }))}
                        checked={!!enrollment?.digital_access}
                    />
                </div>
            </div>

            <Button
                className="mt-3"
                label="Edit Enrollment"
                severity="warning"
                loading={loading}
                onClick={updateEnrollment}
                pt={{
                    label: { className: TEXT_SIZE_SMALL },
                }}
            />
        </Dialog>
    );
}
