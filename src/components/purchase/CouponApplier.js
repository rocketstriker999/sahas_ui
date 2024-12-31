import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

export default function CouponApplier({ appliedCoupon, couponBenifit, applyCoupon }) {
    const [coupon, setCoupon] = useState(false);

    if (appliedCoupon) {
        return (
            <div className="text-right">
                <Chip
                    className={`${couponBenifit > 0 ? "text-green-500" : "text-red-500"} text-sm font-bold`}
                    label={`${appliedCoupon} - ${couponBenifit} Rs.`}
                    removable
                    onRemove={() => applyCoupon()}
                />
            </div>
        );
    } else {
        return coupon !== false ? (
            <div className="p-inputgroup flex-1">
                <InputText value={coupon} placeholder="Coupon Code" autoFocus onChange={(e) => setCoupon(e.target.value)} />
                <Button
                    icon="pi pi-check"
                    className="p-button-success"
                    onClick={() => {
                        if (coupon) {
                            applyCoupon(coupon);
                        }
                    }}
                />
                <Button
                    icon="pi pi-times"
                    className="p-button-danger"
                    onClick={() => {
                        setCoupon(false);
                    }}
                />
            </div>
        ) : (
            <p className={`font-bold text-yellow-500 m-0 p-0 text-right text-sm mb-2`} onClick={() => setCoupon()}>
                Apply Coupon
            </p>
        );
    }
}
