import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

export default function CouponCodeApplier({ appliedCouponCode, couponCodeBenifit, applyCouponCode }) {
    const [couponCode, setCouponCode] = useState(false);

    if (appliedCouponCode) {
        return (
            <div className="text-right">
                <Chip
                    className={`${couponCodeBenifit > 0 ? "text-green-500" : "text-red-500"} text-sm font-bold`}
                    label={`${appliedCouponCode} - ${couponCodeBenifit} Rs.`}
                    removable
                    onRemove={() => applyCouponCode()}
                />
            </div>
        );
    } else {
        return couponCode !== false ? (
            <div className="p-inputgroup flex-1">
                <InputText value={couponCode} placeholder="Coupon Code" autoFocus onChange={(e) => setCouponCode(e.target.value)} />
                <Button
                    icon="pi pi-check"
                    className="p-button-success"
                    onClick={() => {
                        if (couponCode) {
                            applyCouponCode(couponCode);
                        }
                    }}
                />
                <Button
                    icon="pi pi-times"
                    className="p-button-danger"
                    onClick={() => {
                        setCouponCode(false);
                    }}
                />
            </div>
        ) : (
            <p className={`font-semibold text-white bg-red-500 border-round-lg m-0 p-2 text-right text-sm`} onClick={() => setCouponCode()}>
                Apply Coupon Code
            </p>
        );
    }
}
