import { Card } from "primereact/card";
import { APP_NAME, REGEX_EMAIL } from "../constants";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { Avatar } from "primereact/avatar";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import Error from "../components/common/Error";

export default function Authentication() {
    const [userAuthentication, setUserAuthentication] = useState();
    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState();

    const { requestAPI } = useAppContext();

    const requestOTP = () => {
        if (REGEX_EMAIL.test(userAuthentication?.email)) {
            requestAPI({
                requestPath: "token",
                requestMethod: "POST",
                onRequestFailure: (error) => setErrors((prev) => ({ ...prev, otpGeneration: error })),
                onRequestStart: setErrors,
                setLoading: setLoading,
                onResponseReceieved: (otpGeneration, responseCode) => {
                    return setUserAuthentication((prev) => ({ ...prev, otpRequestRaised: true }));
                    if (otpGeneration && responseCode === 201) setUserAuthentication((prev) => ({ ...prev, otpRequestRaised: true }));
                    else setErrors((prev) => ({ ...prev, otpGeneration: "Failed To Generate OTP, Try Again Later !" }));
                },
            });
        } else {
            setErrors((prev) => ({ ...prev, otpGeneration: "Enter Valid Email Address !" }));
        }
    };

    const validateOTP = () => {
        requestAPI({
            requestPath: "token",
            requestMethod: "POST",
            onRequestFailure: (error) => setErrors((prev) => ({ ...prev, otpValidation: error })),
            onRequestStart: setErrors,
            setLoading: setLoading,
            onResponseReceieved: (otpValidation, responseCode) => {
                if (otpValidation && responseCode === 200) setUserAuthentication((prev) => ({ ...prev, otpRequestRaised: true }));
                else setErrors((prev) => ({ ...prev, otpValidation: "Invalid OTP" }));
            },
        });
    };

    return (
        <div className="h-screen bg-blue-500 text-white">
            <div className="px-3 py-4">
                <Card title={APP_NAME}>
                    <div className="text-center flex flex-column align-items-center justify-content-center">
                        <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                        <p className="p-0 m-0 font-semibold mt-2">Verify Your User Credentials To Continue</p>

                        <div className="p-inputgroup mt-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-envelope"></i>
                            </span>
                            <InputText
                                placeholder="Enter Your Email"
                                disabled={loading}
                                value={userAuthentication?.email || ""}
                                onInput={(e) => {
                                    setUserAuthentication((prev) => ({ ...prev, email: e.target.value }));
                                }}
                                invalid={errors?.otpGeneration}
                            />
                        </div>
                        {errors?.otpGeneration && <Error className="w-full p-2 justify-content-end" error={errors?.otpGeneration} />}

                        <Button
                            onClick={requestOTP}
                            className="w-full mt-3"
                            severity="warning"
                            icon="pi pi-arrow-right"
                            label="Continue With Email"
                            disabled={loading}
                            loading={loading}
                        />
                    </div>
                </Card>
            </div>

            <Dialog
                position="bottom"
                className="w-11"
                header="Verify OTP"
                visible={userAuthentication?.otpRequestRaised}
                onHide={() => {
                    setUserAuthentication((prev) => ({ ...prev, otpRequestRaised: false, otp: null }));
                }}
            >
                <div className="flex flex-column justify-content-center align-items-center">
                    <div className="flex gap-2 text-gray-800 align-items-center justify-content-center">
                        <i className="pi pi-exclamation-circle"></i>
                        <p className="text-sm">Enter The OTP That We have Sent You !</p>
                    </div>

                    <InputOtp
                        length={4}
                        disabled={loading}
                        invalid={errors?.otpValidation}
                        value={userAuthentication?.otp}
                        integerOnly
                        mask
                        onChange={(e) => {
                            setUserAuthentication((prev) => ({ ...prev, otp: e.value }));
                            if (e.value?.length === 4) {
                                validateOTP();
                            }
                        }}
                    />
                    {errors?.otpValidation && <Error className="p-2" error={errors?.otpValidation} />}

                    <Button onClick={requestOTP} className="w-full mt-3" icon="pi pi-clock" label="Resend " disabled={loading} loading={loading} />
                </div>
            </Dialog>

            <p className="text-sm absolute bottom-0 w-full text-center ">{`Copyright © 2019-2025 ${APP_NAME}`} </p>
        </div>
    );
}
