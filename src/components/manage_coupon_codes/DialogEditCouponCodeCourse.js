import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";

export default function DialogEditCouponCodeCourse({ visible, setCouponCodeCourses, closeDialog, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [couponCodeCourse, setcouponCodeCourse] = useState(props);
    const [loading, setLoading] = useState();

    const editCouponCodeCourse = useCallback(() => {
        requestAPI({
            requestPath: `coupon-code-courses`,
            requestMethod: "PATCH",
            requestPostBody: {
                ...couponCodeCourse,
                distributor_email: couponCodeCourse?.distributor_email || null,
            },
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Edit Coupon Code Course !", life: 2000 }),
            onResponseReceieved: (updatedCouponCodeCourse, responseCode) => {
                if (updatedCouponCodeCourse && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Coupon Code Course Updated", life: 1000 });
                    setCouponCodeCourses((prev) =>
                        prev?.map((couponCodeCourse) => (couponCodeCourse?.id === props?.id ? updatedCouponCodeCourse : couponCodeCourse))
                    );
                    setcouponCodeCourse(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Coupon Code Course !", life: 2000 });
            },
        });
    }, [closeDialog, couponCodeCourse, props, requestAPI, setCouponCodeCourses, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Coupon Code Course`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title={props?.title} />

            <div className="flex align-items-center mt-5 gap-1">
                <FloatLabel className="flex-1">
                    <InputNumber
                        value={couponCodeCourse?.discount}
                        id="discount"
                        onChange={(e) => setcouponCodeCourse((prev) => ({ ...prev, discount: e.value }))}
                        disabled={loading}
                        inputClassName="w-full"
                    />
                    <label htmlFor="discount">Discount</label>
                </FloatLabel>
                <SelectButton
                    value={couponCodeCourse?.discount_type}
                    onChange={(e) => setcouponCodeCourse((prev) => ({ ...prev, discount_type: e.target.value }))}
                    options={["₹", "%"]}
                />
            </div>

            <FloatLabel className="mt-5">
                <InputText
                    value={couponCodeCourse?.distributor_email || ""}
                    id="distributor_email"
                    className="w-full"
                    onChange={(e) => setcouponCodeCourse((prev) => ({ ...prev, distributor_email: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="distributor_email">Distributor Email</label>
            </FloatLabel>

            <div className="flex align-items-center  mt-5 gap-1">
                <FloatLabel className="flex-1">
                    <InputNumber
                        value={couponCodeCourse?.commision}
                        id="commision"
                        onChange={(e) => setcouponCodeCourse((prev) => ({ ...prev, commision: e.value }))}
                        disabled={loading}
                        inputClassName="w-full"
                    />
                    <label htmlFor="commision">Commision</label>
                </FloatLabel>
                <SelectButton
                    value={couponCodeCourse?.commision_type}
                    onChange={(e) => setcouponCodeCourse((prev) => ({ ...prev, commision_type: e.target.value }))}
                    options={["₹", "%"]}
                />
            </div>

            <div className="flex align-items-center  mt-5 gap-1">
                <FloatLabel className="flex-1">
                    <InputNumber
                        value={couponCodeCourse?.validity}
                        id="validity"
                        onChange={(e) => setcouponCodeCourse((prev) => ({ ...prev, validity: e.value }))}
                        disabled={loading}
                        inputClassName="w-full"
                    />
                    <label htmlFor="validity">Validity Days</label>
                </FloatLabel>
                <SelectButton
                    value={couponCodeCourse?.validity_type}
                    onChange={(e) => setcouponCodeCourse((prev) => ({ ...prev, validity_type: e.target.value }))}
                    options={["EXTEND", "FIX"]}
                />
            </div>

            <Button className="mt-3" label="Edit Coupon Code Course" severity="warning" loading={loading} onClick={editCouponCodeCourse} />
        </Dialog>
    );
}
