import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

export default function DialogEditCouponCode({ visible, setCouponCodes, closeDialog, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [couponCode, setCouponCode] = useState(props);
    const [loading, setLoading] = useState();

    const editCouponCode = useCallback(() => {
        requestAPI({
            requestPath: `coupon-codes`,
            requestMethod: "PATCH",
            requestPostBody: couponCode,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Coupon Code !", life: 2000 }),
            onResponseReceieved: (updatedCourse, responseCode) => {
                if (updatedCourse && responseCode === 200) {
                    showToast({ severity: "success", summary: "Updated", detail: "Course Updated", life: 1000 });
                    setCouponCodes((prev) => prev?.map((course) => (course?.id === props?.id ? updatedCourse : course)));
                    setCouponCode(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Course !", life: 2000 });
            },
        });
    }, [closeDialog, couponCode, props, requestAPI, setCouponCodes, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Coupon Code`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Edit Coupon Code" />

            <FloatLabel className="mt-5">
                <InputText
                    value={couponCode?.code || ""}
                    id="code"
                    className="w-full"
                    onChange={(e) => setCouponCode((prev) => ({ ...prev, code: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="code">Code</label>
            </FloatLabel>

            <div className="text-color-secondary flex align-items-center gap-2 mt-3 border-1 border-gray-300 py-3 px-2 border-round">
                <label className="flex-1" htmlFor="requires_enrollment">
                    Active
                </label>
                <Checkbox
                    className="mr-2"
                    inputId="requires_enrollment"
                    onChange={({ checked }) => setCouponCode((prev) => ({ ...prev, active: checked }))}
                    checked={!!couponCode?.active}
                />
            </div>

            <Button className="mt-3" label="Edit Coupon Code" severity="warning" loading={loading} onClick={editCouponCode} />
        </Dialog>
    );
}
