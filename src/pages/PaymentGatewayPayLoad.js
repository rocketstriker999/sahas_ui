import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import TransactionStatus from "../components/payment_gateway_payloads/TransactionStatus";

export default function PaymentGatewayPayLoad() {
    const [paymentGatewayPayLoad, setPaymentGateWayPayLoad] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    const { paymentGatewayPayloadId } = useParams();

    useEffect(() => {
        if (paymentGatewayPayloadId)
            requestAPI({
                requestPath: `payment-gateway-payloads/${paymentGatewayPayloadId}`,
                requestMethod: "GET",
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (paymentGatewayPayLoad, responseCode) => {
                    if (paymentGatewayPayLoad && responseCode === 200) {
                        setPaymentGateWayPayLoad(paymentGatewayPayLoad);
                    } else {
                        setError("Couldn't load Payment Result");
                    }
                },
            });
    }, [paymentGatewayPayloadId, requestAPI]);

    return (
        <div className="flex flex-column h-full justify-content-center p-4 bg-blue-500">
            {loading ? (
                <Loading message="Loading Payment Status" />
            ) : error ? (
                <NoContent error={error} />
            ) : paymentGatewayPayLoad?.transaction?.paid ? (
                <TransactionStatus {...paymentGatewayPayLoad?.transaction?.paid} />
            ) : (
                <NoContent error={"Payment Was Unsuccesful"} />
            )}
        </div>
    );
}
