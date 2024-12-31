import { useEffect, useState } from "react";
import { requestProxy } from "../utils";
import { useParams } from "react-router-dom";
import ButtonPay from "../components/purchase/ButtonPay";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import Loading from "../components/common/Loading";
import CouponApplier from "../components/purchase/CouponApplier";

export default function Purchase() {
    const [transaction, setTransaction] = useState();
    const [loading, setLoading] = useState();
    const { productId } = useParams();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState();

    useEffect(() => {
        //hit API Once
        requestProxy({
            requestMethod: "POST",
            requestPostBody: {
                productId,
                coupon: appliedCoupon,
            },
            requestPath: `/api/transactions`,
            setLoading: setLoading,
            onResponseReceieved: (transaction, responseCode) => {
                if (transaction && responseCode === 200) {
                    setTransaction(transaction);
                }
            },
        });
    }, [productId, appliedCoupon]);

    if (loading) {
        return <Loading />;
    }

    if (!loading && transaction) {
        return (
            <div className="p-5">
                <h2 className="text-lg font-bold">Review your purchase information</h2>
                <p className="text-sm text-600 mb-4">{transaction.title}</p>

                <div className="flex justify-content-between mb-3 text-xs">
                    <span className="font-bold">Original Price</span>
                    <span className="font-bold">{transaction.price} Rs.</span>
                </div>

                <div className="flex justify-content-between mb-3 text-xs">
                    <span className="font-bold">Discounted Price</span>
                    <span className="font-bold">{transaction.discounted} Rs.</span>
                </div>

                <div className="flex justify-content-between mb-3 text-xs">
                    <span className="font-bold">SGST</span>
                    <span className="font-bold">{transaction.sgst} Rs.</span>
                </div>
                <div className="flex justify-content-between mb-3 text-xs">
                    <span className="font-bold">CGST</span>
                    <span className="font-bold">{transaction.cgst} Rs.</span>
                </div>
                <CouponApplier appliedCoupon={appliedCoupon} couponBenifit={transaction.benifit} applyCoupon={setAppliedCoupon} />

                <Divider />

                <div className="flex justify-content-between font-bold text-base mb-2">
                    <span>Pay:</span>
                    <span className="text-primary text-base">{transaction.pay} Rs.</span>
                </div>

                <div className="flex align-items-center gap-2 mb-3 ">
                    <Checkbox id="terms" checked={termsAccepted} invalid={!termsAccepted} onChange={(e) => setTermsAccepted(e.checked)} />
                    <label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/path-to-your-pdf.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                            Terms and Conditions
                        </a>
                    </label>
                </div>

                <ButtonPay transaction={transaction} disabled={!termsAccepted} />
            </div>
        );
    }
}
