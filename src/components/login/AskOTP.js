import { Divider } from "primereact/divider";
import { useRef, useState } from "react";
import { requestProxy } from "../../utils";
import { InputOtp } from "primereact/inputotp";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/sliceUser";
import { Button } from "primereact/button";
import ButtonResendOTP from "./ButtonResendOTP";
import { Messages } from "primereact/messages";

export default function AskOTP({ email }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const message = useRef(null);

    const verifyOTP = (otp) => {
        requestProxy({
            requestPath: "/api/otp/verify",
            requestPostBody: {
                email,
                otp: otp,
            },
            requestMethod: "POST",
            setLoading: setLoading,
            onResponseReceieved: (verification, responseCode) => {
                if (verification && responseCode === 200) {
                    //save token which will be receieved into this
                    dispatch(setCurrentUser(verification.user));
                } else {
                    throw new Error(verification.error);
                }
            },
            onRequestFailure: (error) => {
                setError(error);
                message.current.show([{ severity: "error", detail: error.message, sticky: true }]);
            },
        });
    };

    return (
        <div className="col-12 lg:col-6 sm:col-12 md:col-6 flex flex-column align-items-center justify-content-center">
            <label htmlFor="OTP" className="font-bold block mb-4 lg:text-3xl text-2xl lg:w-7 text-center">
                "Verify OTP Which is Sent to "{email}
            </label>

            <Messages ref={message} />

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
                <ButtonResendOTP email={email} />
                <Divider align="center">
                    <b>OR</b>
                </Divider>
                <Button className="w-full" outlined label="Login to Different Account" />
            </div>
        </div>
    );
}
