import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { useCallback, useState } from "react";
import TabHeader from "../TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";

export default function DialogAddInquiry({ userId, addingNewInquiry, setAddingNewInquiry, courses, branches, setInquiries }) {
    const [inquiry, setInquiry] = useState();
    const [loading, setLoading] = useState();
    const { requestAPI, showToast } = useAppContext();

    const addInquiry = useCallback(() => {
        requestAPI({
            requestPath: `inquiries/`,
            requestMethod: "POST",
            requestPostBody: { ...inquiry, user_id: userId },
            setLoading: setLoading,
            onResponseReceieved: (inquiry, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Updated", detail: "Inquiry Added", life: 1000 });
                    setInquiries((prev) => [inquiry, ...prev]);
                    setInquiry(() => ({
                        user_id: userId,
                    })); //reset this form
                    setAddingNewInquiry(() => false); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Inquiry !", life: 2000 });
                }
            },
        });
    }, [inquiry, requestAPI, setAddingNewInquiry, setInquiries, showToast, userId]);

    return (
        <Dialog header={`Add New Inquiry`} visible={addingNewInquiry} className="w-11" onHide={() => setAddingNewInquiry(false)}>
            <TabHeader
                className="pt-3"
                title="Requred Information - New Inquiry"
                highlights={[`Active Inquiry Will Be Added`, "Course Is Not Changable Post Add"]}
            />

            <FloatLabel className="mt-5">
                <Dropdown
                    value={branches?.find((branch) => branch.id === inquiry?.branch_id)}
                    inputId="branch"
                    options={branches}
                    optionLabel="title"
                    className="w-full"
                    onChange={(e) => setInquiry((prev) => ({ ...prev, branch_id: e.value?.id }))}
                    disabled={loading}
                />
                <label htmlFor="branch">Branch</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <Dropdown
                    value={courses?.find((course) => course.id === inquiry?.course_id)}
                    inputId="course"
                    options={courses}
                    optionLabel="title"
                    className="w-full"
                    onChange={(e) => setInquiry((prev) => ({ ...prev, course_id: e.value?.id }))}
                    disabled={loading}
                />
                <label htmlFor="course">Course</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputTextarea
                    value={inquiry?.note}
                    id="note"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setInquiry((prev) => ({ ...prev, note: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="note">Note</label>
            </FloatLabel>
            <Button className="mt-3" label="Add Inquiry" severity="warning" loading={loading} onClick={addInquiry} />
        </Dialog>
    );
}
