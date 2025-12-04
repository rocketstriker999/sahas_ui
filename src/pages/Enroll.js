import { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import ButtonPay from "../components/enroll/ButtonPay";
import { RUPEE } from "../constants";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import { Chip } from "primereact/chip";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { getReadableDate } from "../utils";
import { Tag } from "primereact/tag";
import { useSelector } from "react-redux";

export default function Enroll() {
    const [paymentGateWayPayLoad, setPaymentGateWayPayLoad] = useState();
    const { courseId } = useParams();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [couponCode, setCouponCode] = useState();

    const [payInputs, setPayInputs] = useState({ courseId });

    const { id, phone, full_name } = useSelector((state) => state.stateUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (courseId)
            requestAPI({
                requestPath: `payment-gateway-payloads`,
                requestMethod: "POST",
                requestPostBody: payInputs,
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (paymentGateWayPayLoad, responseCode) => {
                    if (paymentGateWayPayLoad && responseCode === 201) {
                        setPaymentGateWayPayLoad(paymentGateWayPayLoad);
                    }
                },
            });
    }, [courseId, payInputs, requestAPI]);

    return loading ? (
        <Loading message="Preparing For Payment Gateway" />
    ) : error ? (
        <NoContent error={error} />
    ) : paymentGateWayPayLoad ? (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Enroll - ${paymentGateWayPayLoad?.course?.title}`} />
            <img className="w-full" src={paymentGateWayPayLoad?.course?.image} alt={paymentGateWayPayLoad?.course?.image} />

            <div className="flex flex-column gap-2 p-4 border-1 border-gray-300 m-2 border-round">
                <div className="flex align-items-center justify-content-between text-lg font-bold">
                    <span>Fees</span>
                    <span>
                        {paymentGateWayPayLoad?.course?.fees} {RUPEE}
                    </span>
                </div>
                {paymentGateWayPayLoad?.transaction?.couponCode && (
                    <div className="flex align-items-center justify-content-between text-sm">
                        <Chip
                            onRemove={() => {
                                setPayInputs((prev) => ({ ...prev, couponCode: false }));
                            }}
                            pt={{
                                label: classNames(`text-sm  font-bold ${paymentGateWayPayLoad?.transaction?.discount > 0 ? `text-green-800` : `text-red-800`}`),
                            }}
                            label={`${paymentGateWayPayLoad?.transaction?.couponCode} Discount`}
                            removable
                        />

                        <span className="text-red-500 font-bold">
                            -{paymentGateWayPayLoad?.transaction?.discount} {RUPEE}
                        </span>
                    </div>
                )}
                {paymentGateWayPayLoad?.transaction?.usedWalletBalance && (
                    <div className="flex align-items-center justify-content-between text-sm">
                        <span>Wallet Balance</span>
                        <span className="text-red-500 font-bold">
                            -{paymentGateWayPayLoad?.transaction?.usedWalletBalance} {RUPEE}
                        </span>
                    </div>
                )}

                <Divider className="m-0 pt-2" />

                {paymentGateWayPayLoad?.transaction?.preTaxAmount !== paymentGateWayPayLoad?.course?.fees && (
                    <div className="flex align-items-center justify-content-between  font-semibold">
                        <span>Pre Tax</span>
                        <span>
                            {paymentGateWayPayLoad?.transaction?.preTaxAmount} {RUPEE}
                        </span>
                    </div>
                )}

                <div className="flex align-items-center justify-content-between text-sm mt-2">
                    <span>CGST</span>
                    <span>
                        {paymentGateWayPayLoad?.transaction?.cgst} {RUPEE}
                    </span>
                </div>
                <div className="flex align-items-center justify-content-between text-sm">
                    <span>SGST</span>
                    <span>
                        {paymentGateWayPayLoad?.transaction?.sgst} {RUPEE}
                    </span>
                </div>

                <div className="flex align-items-center justify-content-between font-bold">
                    <span>Pay</span>
                    <span>
                        {paymentGateWayPayLoad?.transaction?.amount} {RUPEE}
                    </span>
                </div>
            </div>

            <div className="flex align-items-center gap-2  p-3 border-1 border-gray-300 m-2 border-round">
                <i className="pi pi-calendar"></i>
                <span className="flex-1">Validity</span>
                <span className="font-bold">{getReadableDate({ date: paymentGateWayPayLoad?.course?.validity, removeTime: true })}</span>
            </div>

            {paymentGateWayPayLoad?.user?.wallet > 0 && (
                <div className="flex align-items-center gap-2  p-3 border-1 border-gray-300 m-2 border-round">
                    <i className="pi pi-wallet"></i>
                    <span className="flex-1">
                        Use Wallet Balance (
                        <strong>
                            {paymentGateWayPayLoad?.user?.wallet} {RUPEE}
                        </strong>
                        )
                    </span>
                    <Checkbox checked={payInputs?.useWalletBalance} onChange={(e) => setPayInputs((prev) => ({ ...prev, useWalletBalance: e.checked }))} />
                </div>
            )}

            {!paymentGateWayPayLoad?.transaction?.couponCode && (
                <div className="flex align-items-center gap-2 p-3 border-1 border-gray-300 m-2 border-round">
                    <i className="pi pi-ticket"></i>
                    <span className="flex-1">Coupon Code</span>
                    <Inplace
                        pt={{
                            content: classNames("flex"),
                        }}
                    >
                        <InplaceDisplay>
                            <span className="font-bold text-orange-500">Apply</span>
                        </InplaceDisplay>
                        <InplaceContent>
                            <div className="p-inputgroup">
                                <InputText
                                    value={couponCode}
                                    className="w-8rem"
                                    placeholder="Code"
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    autoFocus
                                />
                                <Button icon="pi pi-check" severity="success" onClick={() => setPayInputs((prev) => ({ ...prev, couponCode }))} />
                            </div>
                        </InplaceContent>
                    </Inplace>
                </div>
            )}

            <div className="flex flex-column align-items-center mt-2 gap-3">
                <div className="flex align-items-center gap-2 mb-3 ">
                    <Checkbox id="terms" checked={termsAccepted} invalid={!termsAccepted} onChange={(e) => setTermsAccepted(e.checked)} />
                    <label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/path-to-your-pdf.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                            Terms and Conditions
                        </a>
                    </label>
                </div>

                {(!phone || !full_name) && (
                    <Tag
                        onClick={() => navigate(`/manage-users/${id}/basics`)}
                        className="fadein animation-duration-1000 animation-iteration-infinite"
                        icon="pi pi-exclamation-circle"
                        severity="danger"
                        value="Missing Contact Details"
                    />
                )}

                <ButtonPay {...paymentGateWayPayLoad} disabled={!termsAccepted || !phone || !full_name} icon="pi pi-wallet" label={`Continue To Pay`} />
            </div>
        </div>
    ) : (
        <NoContent error={"Unable To Enroll This Course"} />
    );
}
