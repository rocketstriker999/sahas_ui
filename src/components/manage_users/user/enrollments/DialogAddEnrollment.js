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
import AccessController from "./AccessController";

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
        <Dialog header={`Add New Enrollment`} visible={visible} className="w-11" onHide={closeDialog}>
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
                />
                <label htmlFor="courses">Courses</label>
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
                <label htmlFor="start_date">Start Date</label>
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
                <label htmlFor="end_date">End Date</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputNumber value={enrollment?.fees} id="fees" className="w-full" onChange={(e) => setEnrollment((prev) => ({ ...prev, fees: e.value }))} />
                <label htmlFor="fees">Total Fees</label>
            </FloatLabel>

            <AccessController enrollment={enrollment} setEnrollment={setEnrollment} />

            <Button className="mt-3" label="Add Enrollment" severity="warning" loading={loading} onClick={addTransaction} />
        </Dialog>
    );
}
