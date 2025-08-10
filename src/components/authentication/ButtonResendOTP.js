import { Button } from "primereact/button";
import { useInterval } from "primereact/hooks";
import { classNames } from "primereact/utils";
import { useState } from "react";

export default function ButtonResendOTP({ resendInterval = 60, requestOTP, setError }) {
    const [waitSeconds, setWaitSeconds] = useState(resendInterval);
    const [loading, setLoading] = useState();

    useInterval(() => setWaitSeconds((prev) => prev - 1), 1000, waitSeconds > 0);

    return (
        <Button
            onClick={() => {
                requestOTP(setLoading, setError);
                setWaitSeconds(resendInterval);
            }}
            className="w-full mt-3"
            icon="pi pi-clock"
            label={waitSeconds ? `Resend OTP in ${waitSeconds} Seconds` : "Resend OTP"}
            disabled={loading || waitSeconds > 0}
            loading={loading}
            pt={{
                label: { className: classNames("text-sm sm:text-base md:text-lg lg:text-xl") },
                icon: { className: classNames("text-sm sm:text-base md:text-lg lg:text-xl") }
            }}
        />
    );
}
