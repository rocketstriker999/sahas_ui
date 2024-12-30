import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

export default function CouponApplier({ appliedCouponCode, couponBenifit, applyCoponCode }) {
    const [allowEdit, setAllowEdit] = useState(false);
    const [couponCode, setCouponCode] = useState("");

    if (appliedCouponCode) {
        return (
            <div className="text-right">
                <Chip
                    className={`${couponBenifit > 0 ? "text-green-500" : "text-red-500"} text-sm font-bold`}
                    label={`${appliedCouponCode} - ${couponBenifit} Rs.`}
                    removable
                    onRemove={() => applyCoponCode()}
                />
            </div>
        );
    }

    return (
        <>
            {!allowEdit ? (
                <p className={`font-bold text-yellow-500 m-0 p-0 text-right text-sm mb-2`} onClick={() => setAllowEdit(true)}>
                    Apply Coupon
                </p>
            ) : (
                <div className="p-inputgroup flex-1">
                    <InputText value={couponCode} placeholder="Coupon Code" autoFocus onChange={(e) => setCouponCode(e.target.value)} />
                    <Button
                        icon="pi pi-check"
                        className="p-button-success"
                        onClick={() => {
                            if (couponCode) {
                                applyCoponCode(couponCode);
                            }
                        }}
                    />
                    <Button
                        icon="pi pi-times"
                        className="p-button-danger"
                        onClick={() => {
                            setAllowEdit(false);
                            setCouponCode("");
                        }}
                    />
                </div>
            )}
        </>
    );
}
