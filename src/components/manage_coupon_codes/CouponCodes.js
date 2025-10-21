import NoContent from "../common/NoContent";
import CouponCode from "./CouponCode";
import { useOutletContext } from "react-router-dom";

export default function CouponCodes() {
    const { couponCodes, setCouponCodes } = useOutletContext();

    return (
        <div className="flex-1 overflow-hidden flex flex-column gap-2 p-2">
            {couponCodes?.length ? (
                couponCodes.map((couponCode) => <CouponCode key={couponCode?.id} {...couponCode} setCouponCodes={setCouponCodes} />)
            ) : (
                <NoContent />
            )}
        </div>
    );
}
