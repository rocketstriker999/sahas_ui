import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function DialogAddCouponCode({ visible, setCouponCodes, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [couponCode, setCouponCode] = useState({});
    const [loading, setLoading] = useState();

    const addCouponCode = useCallback(() => {
        requestAPI({
            requestPath: `coupon-codes`,
            requestMethod: "POST",
            requestPostBody: couponCode,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Coupon Code !", life: 2000 }),
            onResponseReceieved: (couponCode, responseCode) => {
                if (couponCode && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Coupon Code Added", life: 1000 });
                    setCouponCodes((prev) => [couponCode, ...prev]);
                    setCouponCode(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Coupon Code !", life: 2000 });
            },
        });
    }, [closeDialog, couponCode, requestAPI, setCouponCodes, showToast]);

    return (
        <Dialog header={`Add New Coupon Code`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New Coupon Code" highlights={["New Coupon Code Can Be Added"]} />

            <FloatLabel className="mt-5">
                <InputText
                    value={couponCode?.code || ""}
                    id="code"
                    className="w-full"
                    onChange={(e) => setCouponCode((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    disabled={loading}
                />
                <label htmlFor="code">Code</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Coupon Code" severity="warning" loading={loading} onClick={addCouponCode} />
        </Dialog>
    );
}
