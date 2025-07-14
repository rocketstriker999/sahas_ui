import { Button } from "primereact/button";
import { useInterval } from "primereact/hooks";
import { useState } from "react";

export default function ButtonResendOTP({ resendInterval = 60, requestOTP, setError }) {
    const [waitSeconds, setWaitSeconds] = useState(resendInterval);

    const [loading, setLoading] = useState();

    useInterval(
        () => {
            setWaitSeconds((prev) => prev - 1);
        },
        1000,
        waitSeconds > 0
    );

    return (
        <Button
            onClick={() => requestOTP(setLoading, setError)}
            className="w-full mt-3"
            icon="pi pi-clock"
            label={waitSeconds ? `Resend OTP in ${waitSeconds} Seconds` : "Resend OTP"}
            disabled={loading || waitSeconds > 0}
            loading={loading}
        />
    );
}
