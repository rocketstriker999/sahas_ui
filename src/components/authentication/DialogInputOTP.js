import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import { useUpdateEffect } from "primereact/hooks";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useState } from "react";
import ButtonResendOTP from "./ButtonResendOTP";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { KEY_AUTHENTICATION_TOKEN } from "../../constants";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/sliceUser";
import { TEXT_SIZE_NORMAL } from "../../style";

export default function DialogInputOTP({ authenticationToken, setAuthenticationToken, requestOTP }) {
    const { requestAPI } = useAppContext();

    const dispatch = useDispatch();

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
            onResponseReceieved: (user, responseCode) => {
                if (user && responseCode === 200) {
                    localStorage.setItem(KEY_AUTHENTICATION_TOKEN, authenticationToken);
                    dispatch(setCurrentUser(user));
                } else setError("Invalid OTP");
            },
        });
    };

    return (
        <Dialog
            pt={{ content: { className: "overflow-visible" } }}
            position="bottom"
            className="w-11"
            header="Verify OTP"
            visible={authenticationToken}
            onHide={() => setAuthenticationToken()}
        >
            <div className="flex flex-column justify-content-center align-items-center">
                <div className="flex gap-2 text-gray-800 align-items-center justify-content-center">
                    <i className="pi pi-exclamation-circle"></i>
                    <p className={`${TEXT_SIZE_NORMAL}`}>Enter The OTP That We have Sent You !</p>
                </div>

                <InputOtp length={4} disabled={loading} invalid={error} value={otp} integerOnly mask onChange={(e) => setOTP(e.value)} />

                {error && <Error className="p-2" error={error} />}

                {loading && <Loading className={"mt-2"} />}

                <ButtonResendOTP requestOTP={requestOTP} setError={setError} setOTP={setOTP} />
            </div>
        </Dialog>
    );
}
