import { APP_NAME, REGEX_EMAIL } from "../constants";

import { useState } from "react";

import CardInputEmail from "../components/authentication/CardInputEmail";
import DialogInputOTP from "../components/authentication/DialogInputOTP";
import { useAppContext } from "../providers/ProviderAppContainer";

export default function Authentication() {
    const { requestAPI } = useAppContext();

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
                requestPostBody: { email },
                onResponseReceieved: ({ authentication_token }, responseCode) => {
                    if (responseCode === 201) {
                        setAuthenticationToken(authentication_token);
                    } else setError("Failed To Generate OTP, Try Again Later !");
                },
            });
        } else {
            setError("Enter Valid Email Address !");
        }
    };

    return (
        <div className="h-screen bg-blue-500 text-white">
            <CardInputEmail email={email} setEmail={setEmail} requestOTP={requestOTP} />
            {authenticationToken && (
                <DialogInputOTP authenticationToken={authenticationToken} setAuthenticationToken={setAuthenticationToken} requestOTP={requestOTP} />
            )}
            <p className="text-sm absolute bottom-0 w-full text-center ">{`Copyright © 2019-2025 ${APP_NAME}`} </p>
        </div>
    );
}
