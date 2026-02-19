import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { APP_NAME } from "../../constants";
import { useState } from "react";
import Error from "../common/Error";
import { TEXT_SIZE_NORMAL, TITLE_TEXT, TEXT_SIZE_SMALL } from "../../style";
import { classNames } from "primereact/utils";
import DialogContactUs from "./DialogContactUs";

export default function CardInputEmail({ email, setEmail, requestOTP }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [dialogContactUs, setDialogContactUs] = useState({ visible: false });

    return (
        <>           
            <div className="w-full flex flex-column lg:flex-row align-items-center  lg:justify-content-center lg:p-1 lg:gap-3">
                <img className="w-full lg:w-6" src="/images/banner.jpg" alt="banner" />
                <Card
                    title={APP_NAME}
                    className="mt-4"
                    pt={{
                        title: { className: classNames(TITLE_TEXT, "text-center") },
                        content: { className: "pb-0" },
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

                <div className="w-full mt-3">
                    <div className="flex flex-column align-items-end gap-2">
                        <Button
                            icon="pi pi-question"
                            rounded
                            outlined
                            severity="help"
                            className="h-2rem w-2rem"
                            onClick={() => setDialogContactUs((prev) => ({ ...prev, visible: true }))}
                        />
                        <p className={`m-0 ${TEXT_SIZE_SMALL} text-color-secondary`}>Need Help?</p>
                    </div>
                </div>
            </Card>
        </div>
        <DialogContactUs visible={dialogContactUs.visible} closeDialog={() => setDialogContactUs({ visible: false })} />
        </>
    );
}
