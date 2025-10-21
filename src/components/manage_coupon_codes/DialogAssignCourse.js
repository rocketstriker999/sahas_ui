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

export default function DialogAssignCourse({ visible, couponCodeId, couponCodeCourses, setCouponCodeCourses, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const [assignCouponCodeCourses, setAssignCouponCodeCourses] = useState({
        coupon_code_id: couponCodeId,
        discount: 0,
        discount_type: "₹",
        commision: 0,
        commision_type: "₹",
        validity: 0,
        validity_type: "EXTEND",
        distributor_email: null,
    });
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

    console.log(couponCodeCourses);

    return (
        <Dialog header={`Assign Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Assign New Course" highlights={["New Course Can Be Mapped Here", "Course Can Be Unmapped From List"]} />

            <ListBox
                filter
                multiple
                onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, course_ids: e.value }))}
                value={assignCouponCodeCourses?.course_ids}
                options={courses?.filter(({ id }) => !couponCodeCourses?.find(({ course_id }) => course_id === id))}
                className="mt-4 "
                listStyle={{ maxHeight: "128px" }}
                itemTemplate={(option) => (
                    <span className="font-semibold">
                        {option?.title} ({option?.fees} ₹.)
                    </span>
                )}
            />

            <div className="flex align-items-center mt-5 gap-1">
                <FloatLabel className="flex-1">
                    <InputNumber
                        value={assignCouponCodeCourses?.discount}
                        id="discount"
                        onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, discount: e.value }))}
                        disabled={loading}
                        inputClassName="w-full"
                    />
                    <label htmlFor="discount">Discount</label>
                </FloatLabel>
                <SelectButton
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

            <div className="flex align-items-center  mt-5 gap-1">
                <FloatLabel className="flex-1">
                    <InputNumber
                        value={assignCouponCodeCourses?.commision}
                        id="commision"
                        onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, commision: e.value }))}
                        disabled={loading}
                        inputClassName="w-full"
                    />
                    <label htmlFor="commision">Commision</label>
                </FloatLabel>
                <SelectButton
                    value={assignCouponCodeCourses?.commision_type}
                    onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, commision_type: e.target.value }))}
                    options={["₹", "%"]}
                />
            </div>

            <div className="flex align-items-center  mt-5 gap-1">
                <FloatLabel className="flex-1">
                    <InputNumber
                        value={assignCouponCodeCourses?.validity}
                        id="validity"
                        onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, validity: e.value }))}
                        disabled={loading}
                        inputClassName="w-full"
                    />
                    <label htmlFor="validity">Validity Days</label>
                </FloatLabel>
                <SelectButton
                    value={assignCouponCodeCourses?.validity_type}
                    onChange={(e) => setAssignCouponCodeCourses((prev) => ({ ...prev, validity_type: e.target.value }))}
                    options={["EXTEND", "FIX"]}
                />
            </div>

            <Button className="mt-3" label="Assign Course" severity="warning" disabled={!courses?.length} loading={loading} onClick={addCouponCodeCourse} />
        </Dialog>
    );
}
