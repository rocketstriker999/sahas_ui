import { useEffect, useState } from "react";
import { requestAPI } from "../utils";
import { useParams } from "react-router-dom";
import ButtonPay from "../components/purchase/ButtonPay";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import Loading from "../components/common/Loading";
import CouponCodeApplier from "../components/purchase/CouponCodeApplier";
import { Tag } from "primereact/tag";
const moment = require("moment");

export default function Purchase() {
    const [transaction, setTransaction] = useState();
    const [loading, setLoading] = useState();
    const { productId } = useParams();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [appliedCouponCode, setAppliedCouponCode] = useState();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestMethod: "POST",
            requestPostBody: {
                productId,
                couponCode: appliedCouponCode,
            },
            requestPath: `transactions`,
            setLoading: setLoading,
            onResponseReceieved: (transaction, responseCode) => {
                if (transaction && responseCode === 200) {
                    setTransaction(transaction);
                }
            },
        });
    }, [productId, appliedCouponCode]);

    if (loading) {
        return <Loading />;
    }

    if (!loading && transaction) {
        return (
            <div className="px-4 pt-2">
                <h2 className="text-lg font-semibold">Review your purchase information</h2>
                <p className="font-bold text-sm ">{transaction.productTitle}</p>
                <Tag
                    icon="pi pi-calendar"
                    severity="info"
                    value={`Validity ${moment(transaction.productAccessValidity, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY")}`}
                ></Tag>
                <Divider />

                <div className="flex justify-content-between mb-3 text-sm">
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

                <div className="flex justify-content-end  ">
                    <CouponCodeApplier
                        appliedCouponCode={appliedCouponCode}
                        couponCodeBenifit={transaction.benifit}
                        applyCouponCode={setAppliedCouponCode}
                        couponCodeBenifitLabel={transaction.benifitLabel}
                    />
                </div>
                <Divider />
                <div className="flex justify-content-between font-bold text-base mb-3">
                    <span>Pay:</span>
                    <div className=" flex align-items-end gap-2 ">
                        <strike className="text-600 text-xs">{transaction.price} Rs.</strike>
                        <span className="text-primary text-base">{transaction.pay} Rs.</span>
                    </div>
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
