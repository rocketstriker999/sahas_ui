import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { Button } from "primereact/button";

export default function PaymentGatewayPayLoad() {
    const [paymentGatewayPayLoad, setPaymentGateWayPayLoad] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    const { paymentGatewayPayloadId } = useParams();

    const navigate = useNavigate();

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
        <div className="flex flex-column h-full ">
            {loading ? (
                <Loading message="Loading Payment Status" />
            ) : error ? (
                <NoContent error={error} />
            ) : paymentGatewayPayLoad?.transaction?.paid ? (
                <Button severity="warning" label="Go To Course" onClick={() => navigate(`/courses/${paymentGatewayPayLoad?.course?.id}/subjects`)} />
            ) : (
                <NoContent error={"Payment Was Unsuccesful"} />
            )}
        </div>
    );
}
