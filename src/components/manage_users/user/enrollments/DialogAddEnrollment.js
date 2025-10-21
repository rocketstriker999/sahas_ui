import { Dialog } from "primereact/dialog";
import TabHeader from "../../../common/TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { getWriteableDate } from "../../../../utils";
import { useOutletContext } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import { Checkbox } from "primereact/checkbox";
import { TITLE_TEXT, TEXT_SIZE_SMALL } from "../../../../style";

export default function DialogAddEnrollment({ visible, closeDialog, setEnrollments }) {
    const { requestAPI, showToast } = useAppContext();
    const { userId, courses } = useOutletContext();

    const [loading, setLoading] = useState();

    const [enrollment, setEnrollment] = useState();

    const addTransaction = useCallback(() => {
        requestAPI({
            requestPath: `enrollments`,
            requestMethod: "POST",
            requestPostBody: {
                on_site_access: false,
                ...enrollment,
                user_id: userId,
                start_date: getWriteableDate({ date: enrollment?.start_date, removeTime: true }),
                end_date: getWriteableDate({ date: enrollment?.end_date, removeTime: true }),
            },
            setLoading: setLoading,
            onResponseReceieved: (enrollment, responseCode) => {
                if (enrollment && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Enrollment Added", life: 1000 });
                    setEnrollments((prev) => [enrollment, ...prev]);
                    setEnrollment(); //reset this form
                    closeDialog(); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Enrollment !", life: 2000 });
                }
            },
        });
    }, [closeDialog, enrollment, requestAPI, setEnrollments, showToast, userId]);

    return (
        <Dialog header={`Add New Enrollment`} visible={visible} className="w-11" onHide={closeDialog}
            pt={{
                headertitle: { className: TITLE_TEXT },
            }}>
            <TabHeader
                className="pt-3"
                title="Add New Course Enrollment"
                highlights={["Enrollment Will be Recorded immidiatly", "Enrollment Can Be Deactivated"]}
            />

            <FloatLabel className="mt-5">
                <MultiSelect
                    value={enrollment?.courses}
                    inputId="courses"
                    options={courses}
                    optionLabel="title"
                    className="w-full"
                    onChange={(e) => setEnrollment((prev) => ({ ...prev, courses: e.value }))}
                    disabled={loading}
                    pt={{
                        label: { className: TEXT_SIZE_SMALL },
                        item: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <label htmlFor="courses" className={`${TEXT_SIZE_SMALL}`}>Courses</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <Calendar
                    dateFormat="dd/mm/yy"
                    inputId="start_date"
                    className="w-full"
                    value={enrollment?.start_date}
                    onChange={(e) => setEnrollment((prev) => ({ ...prev, start_date: e.value }))}
                    disabled={loading}
                    showTime={false}
                    showIcon
                />
                <label htmlFor="start_date" className={`${TEXT_SIZE_SMALL}`}>Start Date</label>
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
                <label htmlFor="end_date" className={`${TEXT_SIZE_SMALL}`}>End Date</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputNumber value={enrollment?.fees} id="fees" className="w-full" onChange={(e) => setEnrollment((prev) => ({ ...prev, fees: e.value }))}
                    pt={{
                        root: { className: TEXT_SIZE_SMALL },
                    }} />
                <label htmlFor="fees" className={`${TEXT_SIZE_SMALL}`}>Total Fees</label>
            </FloatLabel>

            <div className="border-1 border-round border-gray-300 p-3 flex justify-content-between align-items-center mt-3 gap-3">
                <div className="flex align-items-center gap-2">
                    <label htmlFor="on_site_access" className={`${TEXT_SIZE_SMALL}`}>On Site Access</label>
                    <Checkbox
                        inputId="on_site_access"
                        onChange={({ checked }) => setEnrollment((prev) => ({ ...prev, on_site_access: checked }))}
                        checked={enrollment?.on_site_access}
                    />
                </div>

                <div className="flex align-items-center gap-2">
                    <label htmlFor="digital_access" className={`${TEXT_SIZE_SMALL}`}>Digital Access</label>
                    <Checkbox
                        inputId="digital_access"
                        onChange={({ checked }) => setEnrollment((prev) => ({ ...prev, digital_access: checked }))}
                        checked={enrollment?.digital_access}
                    />
                </div>
            </div>

            <Button className="mt-3" label="Add Enrollment" severity="warning" loading={loading} onClick={addTransaction}
                pt={{
                    label: { className: TEXT_SIZE_SMALL },
                }} />
        </Dialog>
    );
}
