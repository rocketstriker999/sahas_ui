import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useRef, useState } from "react";
import { requestAPI } from "../../utils";

export default function AskEmail({ updateComponentState }) {
    const refUserEmail = useRef();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const generateOTP = () => {
        requestAPI({
            requestPath: "otp/create",
            requestPostBody: { email: refUserEmail.current.value },
            requestMethod: "POST",
            setLoading: setLoading,
            onResponseReceieved: (otpDetails, responseCode) => {
                if (otpDetails && responseCode === 200) {
                    //switch to verification
                    updateComponentState((state) => ({
                        ...state,
                        viewIndex: 1,
                        email: refUserEmail.current.value,
                    }));
                } else {
                    throw new Error("Failed To Generate OTP");
                }
            },
            onRequestFailure: (error) => setError(error.message),
        });
    };

    return (
        <div className="col-12 lg:col-6 sm:col-12 md:col-6 flex flex-column align-items-center justify-content-center">
            <label htmlFor="USER_EMAIL" className="font-bold block mb-4 lg:text-3xl text-2xl lg:w-7 text-center">
                "Enter Email To Continue"
            </label>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <div className="w-full sm:w-10 md:w-9 lg:w-8">
                <InputText ref={refUserEmail} className="w-full mb-3" disabled={loading} invalid={error} id="USER_EMAIL" placeholder="you@example.com" />
                <Button onClick={generateOTP} className="w-full" icon="pi pi-envelope" label="Continue With Email" disabled={loading} loading={loading} />
                <Divider align="center">
                    <b>OR</b>
                </Divider>
                <Button className="w-full" outlined label="Need Help To Login" />
            </div>
        </div>
    );
}
