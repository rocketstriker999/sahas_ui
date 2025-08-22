import { Dialog } from "primereact/dialog";
import TabHeader from "../../../common/TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { getWriteableDate } from "../../../../utils";

export default function DialogAddEnrollment({ userId, addingEnrollment, setAddingEnrollments, courses, setEnrollments }) {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const [enrollment, setEnrollment] = useState();

    const addTransaction = useCallback(() => {
        requestAPI({
            requestPath: `users/${userId}/enrollments`,
            requestMethod: "POST",
            requestPostBody: {
                ...enrollment,
                start_date: getWriteableDate({ date: enrollment?.start_date, removeTime: true }),
                end_date: getWriteableDate({ date: enrollment?.end_date, removeTime: true }),
            },
            setLoading: setLoading,
            onResponseReceieved: (enrollments, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Enrollment Added", life: 1000 });
                    setEnrollments(enrollments);
                    setEnrollment(); //reset this form
                    setAddingEnrollments(() => false); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Enrollment !", life: 2000 });
                }
            },
        });
    }, [enrollment, requestAPI, setAddingEnrollments, setEnrollments, showToast, userId]);

    return (
        <Dialog header={`Add New Enrollment`} visible={addingEnrollment} className="w-11" onHide={() => setAddingEnrollments(false)}>
            <TabHeader
                className="pt-3"
                title="Add New Course Enrollment"
                highlights={["Enrollment Will be Recorded immidiatly", "Enrollment Can Be Deactivated"]}
            />

            <FloatLabel className="mt-5">
                <Dropdown
                    value={enrollment?.course}
                    inputId="courses"
                    options={courses}
                    optionLabel="title"
                    className="w-full"
                    onChange={(e) => setEnrollment((prev) => ({ ...prev, course: e.value }))}
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

            <Button className="mt-3" label="Add Enrollment" severity="warning" loading={loading} onClick={addTransaction} />
        </Dialog>
    );
}
