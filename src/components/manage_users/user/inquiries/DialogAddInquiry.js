import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { useCallback, useState } from "react";
import TabHeader from "../../../common/TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { useOutletContext } from "react-router-dom";
import { TEXT_SIZE_NORMAL, TITLE_TEXT } from "../../../../style";

export default function DialogAddInquiry({ visible, setVisible, setInquiries }) {
    const { userId, courses, branches } = useOutletContext();

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
                    setVisible(() => false); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Inquiry !", life: 2000 });
                }
            },
        });
    }, [inquiry, requestAPI, setInquiries, setVisible, showToast, userId]);

    return (
        <Dialog
            pt={{ content: { className: "overflow-visible" } }}
            header={`Add New Inquiry`}
            visible={visible}
            className="w-11"
            onHide={() => setVisible(false)}
            pt={{
                headertitle: { className: TITLE_TEXT },
            }}
        >
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
                    pt={{
                        input: { className: TEXT_SIZE_NORMAL },
                        item: { className: TEXT_SIZE_NORMAL },
                    }}
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
                    pt={{
                        input: { className: TEXT_SIZE_NORMAL },
                        item: { className: TEXT_SIZE_NORMAL },
                    }}
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
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                />
                <label htmlFor="note">Note</label>
            </FloatLabel>
            <Button className="mt-3" label="Add Inquiry" severity="warning" loading={loading} onClick={addInquiry}
                pt={{
                    label: { className: TEXT_SIZE_NORMAL },
                    icon: { className: TEXT_SIZE_NORMAL }
                }} />
        </Dialog>
    );
}
