import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { useSelector } from "react-redux";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

export default function DialogAssignCourse({ visible, couponCodeId, setCouponCodeCourses, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const [assignCouponCodeCourses, setAssignCouponCodeCourses] = useState({ coupon_code_id: couponCodeId });
    const [loading, setLoading] = useState();

    const addCouponCodeCourse = useCallback(() => {
        requestAPI({
            requestPath: `coupon-code-courses`,
            requestMethod: "POST",
            requestPostBody: assignCouponCodeCourses,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Assign Course !", life: 2000 }),
            onResponseReceieved: (assignedCouponCodeCourses, responseCode) => {
                if (assignedCouponCodeCourses && responseCode === 201) {
                    showToast({ severity: "success", summary: "Assigned", detail: "Course Assigned", life: 1000 });
                    setCouponCodeCourses((prev) => [...assignedCouponCodeCourses, ...prev]);
                    setAssignCouponCodeCourses(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Assign Course !", life: 2000 });
            },
        });
    }, [closeDialog, assignCouponCodeCourses, requestAPI, setCouponCodeCourses, showToast]);

    return (
        <Dialog header={`Assign Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Assign New Course" highlights={["New Course Can Be Mapped Here", "Course Can Be Unmapped From List"]} />

            <ListBox
                filter
                multiple
                onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, course_ids: e.value }))}
                value={assignCouponCodeCourses?.course_ids}
                options={courses}
                className="mt-4 "
                listStyle={{ maxHeight: "98px" }}
                itemTemplate={(option) => (
                    <span className="font-semibold">
                        {option?.id}. {option?.title}
                    </span>
                )}
            />

            <FloatLabel className="mt-5">
                <InputNumber
                    value={assignCouponCodeCourses?.discount}
                    id="discount"
                    className="w-full"
                    onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, discount: e.value }))}
                    disabled={loading}
                />
                <label htmlFor="discount">Discount</label>
            </FloatLabel>

            <div className="flex gap-2 align-items-center border-1 border-gray-300 border-round mt-3 ">
                <label className="flex-1 text-color-secondary	pl-2">Discount Type</label>
                <SelectButton
                    pt={{ button: classNames("border-none border-noround-left	") }}
                    value={assignCouponCodeCourses?.discount_type}
                    onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, discount_type: e.target.value }))}
                    options={["₹", "%"]}
                />
            </div>

            <FloatLabel className="mt-5">
                <InputText
                    value={assignCouponCodeCourses?.distributor_email || ""}
                    id="distributor_email"
                    className="w-full"
                    onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, distributor_email: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="distributor_email">Distributor Email</label>
            </FloatLabel>

            <FloatLabel className="mt-5">
                <InputNumber
                    value={assignCouponCodeCourses?.commision}
                    id="commision"
                    className="w-full"
                    onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, commision: e.value }))}
                    disabled={loading}
                />
                <label htmlFor="commision">Distributor Commision</label>
            </FloatLabel>

            <div className="flex gap-2 align-items-center border-1 border-gray-300 border-round mt-3 ">
                <label className="flex-1 text-color-secondary pl-2">Distributor Commision Type</label>
                <SelectButton
                    pt={{ button: classNames("border-none border-noround-left	") }}
                    value={assignCouponCodeCourses?.commision_type}
                    onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, commision_type: e.target.value }))}
                    options={["₹", "%"]}
                />
            </div>

            <Button className="mt-3" label="Assign Course" severity="warning" disabled={!courses?.length} loading={loading} onClick={addCouponCodeCourse} />
        </Dialog>
    );
}
