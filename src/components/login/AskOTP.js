import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useEffect, useRef, useState } from "react";
import { requestAPI } from "../../utils";
import { InputOtp } from "primereact/inputotp";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/sliceUser";

export default function AskOTP({ componenentState }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [seconds, setSeconds] = useState(60);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resendOTP = () => {
        requestAPI({
            requestPath: "otp/create",
            requestPostBody: { email: componenentState.email },
            requestMethod: "POST",
            setLoading: setLoading,
            onResponseReceieved: (otpDetails, responseCode) => {
                if (otpDetails && responseCode === 200) {
                    setError("OTP Regenerated");
                } else {
                    throw new Error("Failed To Generate OTP");
                }
            },
            onRequestFailure: (error) => setError(error.message),
            onRequestEnd: () => {
                setSeconds(60);
            },
        });
    };

    const verifyOTP = (otp) => {
        requestAPI({
            requestPath: "otp/verify",
            requestPostBody: {
                email: componenentState.email,
                otp: otp,
            },
            requestMethod: "POST",
            setLoading: setLoading,
            onResponseReceieved: (verifiedUser, responseCode) => {
                if (verifiedUser && responseCode === 200) {
                    //save token which will be receieved into this
                    console.log(verifiedUser);
                    dispatch(setCurrentUser(verifiedUser));

                    //navigate to dashboard
                    navigate("/");
                } else {
                    throw new Error(verifiedUser.error);
                }
            },
            onRequestFailure: (error) => setError(error.message),
            onRequestEnd: () => {
                setSeconds(60);
            },
        });
    };

    //timer to allow disallow button to be click for resend otp
    useEffect(() => {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);
    }, [seconds]);

    return (
        <div className="col-12 lg:col-6 sm:col-12 md:col-6 flex flex-column align-items-center justify-content-center">
            <label htmlFor="OTP" className="font-bold block mb-4 lg:text-3xl text-2xl lg:w-7 text-center">
                "Verify OTP Which is Sent to "{componenentState.email}
            </label>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <div className="w-full sm:w-10 md:w-9 lg:w-8">
                <InputOtp
                    length={4}
                    disabled={loading}
                    invalid={error}
                    integerOnly
                    mask
                    onChange={(e) => {
                        if (e.value.length === 4) verifyOTP(e.value);
                    }}
                    pt={{
                        root: classNames("justify-content-center mb-4"),
                    }}
                />
                <Button
                    onClick={resendOTP}
                    className="w-full"
                    icon="pi pi-envelope"
                    label={seconds > 0 ? `Didn't Receieve ? Resend in ${seconds}` : "Resend OTP"}
                    disabled={seconds > 0}
                    loading={loading}
                />
                <Divider align="center">
                    <b>OR</b>
                </Divider>
                <Button className="w-full" outlined label="Login to Different Account" />
            </div>
        </div>
    );
}
