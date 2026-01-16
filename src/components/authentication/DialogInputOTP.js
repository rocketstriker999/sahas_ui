import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";
import { useUpdateEffect } from "primereact/hooks";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useState } from "react";
import ButtonResendOTP from "./ButtonResendOTP";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { KEY_AUTHENTICATION_TOKEN } from "../../constants";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/sliceUser";

export default function DialogInputOTP({
  authenticationToken,
  setAuthenticationToken,
  requestOTP,
}) {
  const { requestAPI } = useAppContext();
  const dispatch = useDispatch();

  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      visible={!!authenticationToken}
      onHide={() => setAuthenticationToken(null)}
      modal
      showHeader={false}
      className="w-full sm:w-25rem m-3"
    >
      <div className="flex flex-column align-items-center text-center p-5 relative">
        <Button
          icon="pi pi-times"
          className="absolute top-0 right-0 m-3 p-button-rounded p-button-text p-button-secondary w-2rem h-2rem"
          onClick={() => setAuthenticationToken(null)}
        />

        <div className="flex align-items-center w-4rem h-4rem justify-content-center bg-orange-50 text-orange-500 border-circle mb-4">
          <i className="pi pi-lock text-3xl" />
        </div>

        <div className="mb-5">
          <h2 className="text-900 font-bold text-xl m-0 mb-2">
            Verify Your Identity
          </h2>
          <p className="text-600 line-height-3 m-0 text-sm">
            Enter the 4-digit code sent to your email
          </p>
        </div>

        <div className="w-full flex flex-column align-items-center gap-3">
          <InputOtp
            length={4}
            integerOnly
            mask
            value={otp}
            disabled={loading}
            invalid={!!error}
            onChange={(e) => setOTP(e.value)}
            pt={{
              root: { className: "justify-content-center gap-3" },
              input: {
                root: {
                  className:
                    "text-2xl w-3rem h-3rem sm:w-4rem sm:h-4rem text-center border-round-xl border-1 surface-border appearance-none focus:border-orange-500 focus:shadow-none transition-colors transition-duration-200",
                },
              },
            }}
          />

          {loading && <Loading />}

          {error && <Error className="justify-content-center" error={error} />}
        </div>

        <div className="mt-5 w-full border-top-1 surface-border pt-4 flex flex-column align-items-center gap-2">
          <span className="text-sm text-600 font-medium">
            Didn't receive the code?
          </span>

          <ButtonResendOTP
            requestOTP={requestOTP}
            setError={setError}
            setOTP={setOTP}
          />
        </div>
      </div>
    </Dialog>
  );
}
