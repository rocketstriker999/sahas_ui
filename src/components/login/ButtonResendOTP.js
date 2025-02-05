import { Fragment, useEffect, useRef, useState } from "react";
import { requestAPI } from "../../utils";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";

export default function ButtonResendOTP({ email }) {
    const [waitTime, setWaitTime] = useState();
    const [loading, setLoading] = useState();
    const message = useRef(null);

    const resendOTP = () => {
        requestAPI({
            requestPath: "otp/create",
            requestPostBody: { email },
            requestMethod: "POST",
            setLoading: setLoading,
            onResponseReceieved: (otpDetails, responseCode) => {
                if (otpDetails && responseCode === 200) {
                    message.current.show([{ severity: "success", detail: "OTP Resent", sticky: false }]);
                    setWaitTime(60);
                } else {
                    throw new Error("Try Again !");
                }
            },
            onRequestFailure: (error) => message.current.show([{ severity: "warn", detail: error.message, sticky: false }]),
        });
    };

    useEffect(() => {
        setTimeout(() => {
            console.log("RUNNING ", waitTime);
            if (waitTime > 0) {
                setWaitTime(waitTime - 1);
            }
        }, 1000);
    }, [waitTime]);

    return (
        <Fragment>
            <Messages ref={message} />
            <Button
                onClick={() => {
                    resendOTP();
                }}
                className="w-full"
                icon="pi pi-envelope"
                label={waitTime > 0 ? `Didn't Receieve ? Resend in ${waitTime}` : "Resend OTP"}
                disabled={loading || waitTime > 0}
                loading={loading}
            />
        </Fragment>
    );
}
