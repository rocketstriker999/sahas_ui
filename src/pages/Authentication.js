import { APP_NAME, REGEX_EMAIL } from "../constants";

import { useState } from "react";

import CardInputEmail from "../components/authentication/CardInputEmail";
import DialogInputOTP from "../components/authentication/DialogInputOTP";
import { useAppContext } from "../providers/ProviderAppContainer";
import { TEXT_SIZE_SMALL } from "../style";
import { Button } from "primereact/button";
import HelpInLineAction from "../components/authentication/HelpInLineAction";

export default function Authentication() {
    const { requestAPI, showToast } = useAppContext();

    const [email, setEmail] = useState();

    const [authenticationToken, setAuthenticationToken] = useState();

    const requestOTP = (setLoading, setError) => {
        if (REGEX_EMAIL.test(email)) {
            requestAPI({
                requestPath: "authentication-tokens",
                requestMethod: "POST",
                onRequestFailure: setError,
                onRequestStart: setError,
                setLoading: setLoading,
                requestPostBody: { email: email.trim() },
                onResponseReceieved: ({ authentication_token }, responseCode) => {
                    if (responseCode === 201) {
                        setAuthenticationToken(authentication_token);
                        showToast({ severity: "success", summary: "OTP", detail: "New OTP is Sent !", life: 1000 });
                    } else {
                        setError("Failed To Generate OTP, Try Again Later !");
                        showToast({ severity: "error", summary: "OTP", detail: "Failed To Request OTP !", life: 3000 });
                    }
                },
            });
        } else {
            setError("Enter Valid Email Address !");
        }
    };

    return (
        <div className="min-h-screen bg-blue-500 md:py-2 flex flex-column">
            <div className="flex flex-1 align-items-center justify-content-center">
                 <CardInputEmail email={email} setEmail={setEmail} requestOTP={requestOTP} />
            </div>
            {authenticationToken && (
                <DialogInputOTP authenticationToken={authenticationToken} setAuthenticationToken={setAuthenticationToken} requestOTP={requestOTP} />
            )}
            <div className="flex justify-content-center align-items-center gap-3">
                <HelpInLineAction />
            </div>

            <p className={`${TEXT_SIZE_SMALL} mb-2 w-full text-center w-full`}>{`Copyright © 2019-2025 ${APP_NAME}`} </p>
        </div>
    );
}
