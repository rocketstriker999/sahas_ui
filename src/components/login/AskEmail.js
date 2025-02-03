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
        const email = refUserEmail.current.value;
        if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|icloud\.com)$/.test(email)) {
            setError("Enter Valid Email Address !");
            return;
        }
        setError("");
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
        <div className="w-11 m-auto">
            <h1 className="font-bold my-4 text-xl lg:text-3xl text-center">"Enter Email To Continue"</h1>

            {error && <p className="text-red-600 text-center text-sm">{error}</p>}

            <InputText ref={refUserEmail} className="w-full mb-3" disabled={loading} invalid={error} id="USER_EMAIL" placeholder="Enter Your Email" />
            <Button onClick={generateOTP} className="w-full" icon="pi pi-envelope" label="Continue With Email" disabled={loading} loading={loading} />
            <Divider align="center">
                <b>OR</b>
            </Divider>
            <Button className="w-full md:mb-4" outlined label="Need Help To Login" />
        </div>
    );
}
