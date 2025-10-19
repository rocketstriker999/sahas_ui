import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import CouponCode from "./CouponCode";

export default function CouponCodes() {
    const [couponCodes, setCouponCodes] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `coupon-codes`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (couponCodes, responseCode) => {
                if (couponCodes && responseCode === 200) {
                    setCouponCodes(couponCodes);
                } else {
                    setError("Couldn't load Coupon Codes");
                }
            },
        });
    }, [requestAPI]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column gap-2 p-2">
            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : couponCodes?.length ? (
                couponCodes.map((couponCode) => <CouponCode {...couponCode} setCouponCodes={setCouponCodes} />)
            ) : (
                <NoContent />
            )}
        </div>
    );
}
