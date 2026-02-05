import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { APP_NAME } from "../../constants";
import { useState } from "react";
import Error from "../common/Error";
import { TEXT_SIZE_NORMAL, TITLE_TEXT, TEXT_SIZE_SMALL } from "../../style";
import { classNames } from "primereact/utils";
import { SpeedDial } from 'primereact/speeddial';

export default function CardInputEmail({ email, setEmail, requestOTP }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const helpItems = [
        {
            label: 'Call',
            icon: 'pi pi-phone',
            command: () => {
                window.location.href = `tel:+919429279966`;
            }
        },
        {
            label: 'Email',
            icon: 'pi pi-envelope',
            command: () => {
                window.location.href = `mailto:support@hammerbyte.co.in`;
            }
        }
    ];

    return (
        <>
            <style>{`
                .card-input-email-speeddial .p-speeddial-button.p-button.p-button-icon-only {
                    width: 2rem !important;
                    height: 2rem !important;
                    min-width: 2rem !important;
                    min-height: 2rem !important;
                }
                .card-input-email-speeddial .p-speeddial-action {
                    width: 2rem !important;
                    height: 2rem !important;
                    min-width: 2rem !important;
                    min-height: 2rem !important;
                }
            `}</style>
            <div className="w-full flex flex-column lg:flex-row align-items-center  lg:justify-content-center lg:p-1 lg:gap-3">
                <img className="w-full lg:w-6" src="/images/banner.jpg" alt="banner" />
                <Card
                    title={APP_NAME}
                    className="mt-4"
                    pt={{
                        title: { className: classNames(TITLE_TEXT, "text-center") },
                        content: { className: "pb-0 p-3", style: { overflow: 'visible', position: 'relative' } },
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
                    <div className="flex flex-column align-items-end relative card-input-email-speeddial">
                        <SpeedDial
                            model={helpItems}
                            direction="left"
                            transitionDelay={80}
                            showIcon="pi pi-question"
                            hideIcon="pi pi-times"
                            buttonClassName="p-button-outlined p-button-help"
                            pt={{
                                root: { className: "relative" },
                                button: { className: "p-0" },
                                menu: { className: "p-0 gap-1" },
                                menuitem: { className: "p-0" },
                                action: { className: "p-0" },
                            }}
                        />
                        <p className={`m-0 mt-2 ${TEXT_SIZE_SMALL} text-color-secondary`}>Need Help?</p>
                    </div>
                </div>
            </Card>
        </div>
        </>
    );
}
