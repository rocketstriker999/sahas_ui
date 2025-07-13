import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import { useUpdateEffect } from "primereact/hooks";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useState } from "react";
import ButtonResendOTP from "./ButtonReGenerateOTP";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { KEY_AUTHENTICATION_TOKEN } from "../../constants";

export default function DialogVerifyOTP({ authenticationToken, setAuthenticationToken, requestOTP }) {
    const { requestAPI } = useAppContext();

    const [otp, setOTP] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useUpdateEffect(() => {
        if (otp?.length === 4) validateOTP();
    }, [otp]);

    const validateOTP = () => {
        requestAPI({
            requestPath: "authentication-tokens",
            requestMethod: "PATCH",
            onRequestFailure: setError,
            onRequestStart: setError,
            setLoading: setLoading,
            requestPostBody: {
                otp,
                authentication_token: authenticationToken,
            },
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (_ && responseCode === 200) {
                    localStorage.setItem(KEY_AUTHENTICATION_TOKEN, authenticationToken);
                } else setError("Invalid OTP");
            },
        });
    };

    return (
        <Dialog position="bottom" className="w-11" header="Verify OTP" visible={authenticationToken} onHide={() => setAuthenticationToken()}>
            <div className="flex flex-column justify-content-center align-items-center">
                <div className="flex gap-2 text-gray-800 align-items-center justify-content-center">
                    <i className="pi pi-exclamation-circle"></i>
                    <p className="text-sm">Enter The OTP That We have Sent You !</p>
                </div>

                <InputOtp length={4} disabled={loading} invalid={error} value={otp} integerOnly mask onChange={(e) => setOTP(e.value)} />

                {error && <Error className="p-2" error={error} />}

                {loading && <Loading className={"mt-2"} />}

                <ButtonResendOTP requestOTP={requestOTP} setError={setError} />
            </div>
        </Dialog>
    );
}
