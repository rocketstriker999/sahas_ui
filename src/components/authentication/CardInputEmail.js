import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { APP_NAME } from "../../constants";
import { useState } from "react";
import Error from "../common/Error";
import { SUB_TITLE_TEXT,TEXT_SIZE_NORMAL, TITLE_TEXT } from "../../style";
import { classNames } from "primereact/utils";

export default function CardInputEmail({ email, setEmail, requestOTP }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    return (
        <div className="w-full max-w-6xl ">
            <div className="grid align-items-center justify-content-center">
                <div className="col-12 md:col-10 md:col-offset-0  lg:col-6 lg:col-offset-0 flex justify-content-center">
                    <div className="block  border-round-lg overflow-hidden max-h-12rem  md:max-h-12rem lg:max-h-16rem">
                        <img
                            src="/images/banner.jpg"
                            alt="banner"
                            className="w-full h-full  object-contain block"
                        />
                    </div>
                </div>
                <div className="col-12 md:col-12 lg:col-6 lg:mt-0  flex align-items-center justify-content-center">
                    <Card
                        title={APP_NAME}
                        className="w-full max-w-25rem"
                        pt={{
                            title: { className: classNames(TITLE_TEXT, "text-center") },
                        }}
                    >
                        <div className="flex flex-column align-items-center text-center w-full">
                            <Avatar icon="pi pi-user" size="xlarge"  shape="circle" className="text-orange-500 surface-200" />
                            <p className={`p-0 m-0 font-semibold mt-2 ${SUB_TITLE_TEXT}`}>Verify Your User Credentials To Continue</p>

                            <div className="p-inputgroup mt-3 w-full">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText
                                    autoFocus
                                    placeholder="Enter Your Email"
                                    disabled={loading}
                                    className="p-inputtext-sm"
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
                                size="small"
                                pt={{
                                    label: { className: TEXT_SIZE_NORMAL },
                                    icon: { className: TEXT_SIZE_NORMAL },
                                }}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
