import { Button } from "primereact/button";
import { useInterval } from "primereact/hooks";
import { useState } from "react";
import { TEXT_SIZE_XS , TEXT_SIZE_SMALL} from "../../style";

export default function ButtonResendOTP({ resendInterval = 60, requestOTP, setError, setOTP }) {
    const [waitSeconds, setWaitSeconds] = useState(resendInterval);
    const [loading, setLoading] = useState();

    useInterval(() => setWaitSeconds((prev) => prev - 1), 1000, waitSeconds > 0);

    return (
        <Button
            onClick={() => {
                requestOTP(setLoading, setError);
                setWaitSeconds(resendInterval);
                setOTP();
            }}
            className="w-full mt-3 p-button-sm"
            icon="pi pi-clock"
            label={waitSeconds ? `Resend OTP in ${waitSeconds} Seconds` : "Resend OTP"}
            disabled={loading || waitSeconds > 0}
            loading={loading}
            pt={{
                label: { className: TEXT_SIZE_XS  },
                icon: { className: TEXT_SIZE_SMALL }
            }}
        />
    );
}
