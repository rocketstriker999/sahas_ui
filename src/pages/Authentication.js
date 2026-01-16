import { APP_NAME, REGEX_EMAIL } from "../constants";
import { useState } from "react";
import CardInputEmail from "../components/authentication/CardInputEmail";
import DialogInputOTP from "../components/authentication/DialogInputOTP";
import { useAppContext } from "../providers/ProviderAppContainer";
import { TEXT_SIZE_SMALL } from "../style";
import NeedHelp from "../components/authentication/NeedHelp";

export default function Authentication() {
  const { requestAPI, showToast } = useAppContext();
  const [email, setEmail] = useState("");
  const [authenticationToken, setAuthenticationToken] = useState(null);

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
            showToast({
              severity: "success",
              summary: "OTP",
              detail: "New OTP is Sent !",
              life: 1000,
            });
          } else {
            setError("Failed To Generate OTP, Try Again Later !");
            showToast({
              severity: "error",
              summary: "OTP",
              detail: "Failed To Request OTP !",
              life: 3000,
            });
          }
        },
      });
    } else {
      setError("Enter Valid Email Address !");
    }
  };

  return (
    <div className="flex flex-column min-h-screen bg-blue-500 ">
      <div className="flex-grow-1 flex align-items-center justify-content-center p-2 w-full">
        <CardInputEmail
          email={email}
          setEmail={setEmail}
          requestOTP={requestOTP}
        />

        {authenticationToken && (
          <DialogInputOTP
            authenticationToken={authenticationToken}
            setAuthenticationToken={setAuthenticationToken}
            requestOTP={requestOTP}
          />
        )}
      </div>

      <div className="flex-shrink-0 w-full flex flex-column align-items-center gap-2 pb-4 pt-2 opacity-80">
        <NeedHelp phone="+919999999999" email="support@example.com" />

        <p className={`${TEXT_SIZE_SMALL} m-0`}>
          {`Copyright © 2019-2025 ${APP_NAME}`}
        </p>
      </div>
    </div>
  );
}
