import { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import ButtonPay from "../components/enroll/ButtonPay";
import { RUPEE } from "../constants";
import { Checkbox } from "primereact/checkbox";

export default function Enroll() {
    const [paymentGateWayPayLoad, setPaymentGateWayPayLoad] = useState();
    const { courseId } = useParams();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        if (courseId)
            requestAPI({
                requestPath: `courses/${courseId}/payment-gateway-payload`,
                requestMethod: "GET",
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (payload, responseCode) => {
                    if (payload && responseCode === 200) {
                        setPaymentGateWayPayLoad(payload);
                    } else {
                        setError("Couldn't load Course");
                    }
                },
            });
    }, [courseId, requestAPI]);

    return loading ? (
        <Loading message="Loading Course" />
    ) : error ? (
        <NoContent error={error} />
    ) : paymentGateWayPayLoad ? (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Enroll - ${paymentGateWayPayLoad?.course?.title}`} />
            <img className="w-full" src={paymentGateWayPayLoad?.course?.image} alt={paymentGateWayPayLoad?.course?.image} />

            <div className="flex align-items-center gap-2 mb-3 ">
                <Checkbox id="terms" checked={termsAccepted} invalid={!termsAccepted} onChange={(e) => setTermsAccepted(e.checked)} />
                <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="/path-to-your-pdf.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                        Terms and Conditions
                    </a>
                </label>
            </div>
            <ButtonPay disabled={!termsAccepted} icon="pi pi-wallet" label={`Enroll For Digital Access ${paymentGateWayPayLoad?.course?.fees} ${RUPEE}`} />
        </div>
    ) : (
        <NoContent error={"Unable To Enroll This Course"} />
    );
}
