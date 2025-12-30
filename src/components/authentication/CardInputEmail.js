import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { APP_NAME } from "../../constants";
import { useState } from "react";
import Error from "../common/Error";
import { TEXT_SIZE_NORMAL, TITLE_TEXT } from "../../style";
import { classNames } from "primereact/utils";

export default function CardInputEmail({ email, setEmail, requestOTP }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    return (
        <div className="flex flex-column align-items-center w-full justify-content-center">
            <img className="w-full lg:w-8 lg:max-h-28rem" src="/images/banner.jpg" alt="banner" />
            <Card
                title={APP_NAME}
                className="w-10 lg:w-6 mt-4"
                pt={{
                    title: { className: classNames(TITLE_TEXT, "text-center") },
                }}
            >
                <div className="flex flex-column align-items-center text-center w-full">
                    <Avatar icon="pi pi-user" size="large" shape="circle" />
                    <p className={`p-0 m-0 font-semibold mt-2 ${TEXT_SIZE_NORMAL}`}>Verify Your User Credentials To Continue</p>

                    <div className="p-inputgroup mt-3 w-full">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText
                            autoFocus
                            placeholder="Enter Your Email"
                            disabled={loading}
                            value={email || ""}
                            onInput={(e) => setEmail(e.target.value)}
                            invalid={error}
                            pt={{
                                root: { className: TEXT_SIZE_NORMAL },
                            }}
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
                        pt={{
                            label: { className: TEXT_SIZE_NORMAL },
                            icon: { className: TEXT_SIZE_NORMAL },
                        }}
                    />
                </div>
            </Card>
        </div>
    );
}
