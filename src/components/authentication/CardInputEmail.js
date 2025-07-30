import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { APP_NAME } from "../../constants";
import { useState } from "react";
import Error from "../common/Error";

export default function CardCollectEmail({ email, setEmail, requestOTP }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    return (
        <div>
            <img className="w-full" src="images/banner.jpg" alt="banner" />
            <Card title={APP_NAME} className="mx-3 mt-4">
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
                            value={email || ""}
                            onInput={(e) => setEmail(e.target.value)}
                            invalid={error}
                        />
                    </div>
                    {error && <Error className="w-full p-2 justify-content-end" error={error} />}

                    <Button
                        onClick={() => requestOTP(setLoading, setError)}
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
    );
}
