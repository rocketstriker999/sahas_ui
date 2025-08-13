import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { APP_NAME } from "../../constants";
import { useState } from "react";
import Error from "../common/Error";
import { classNames } from "primereact/utils";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { TEXT_SIZE_NORMAL,TITLE_TEXT } from "../../styles";

export default function CardInputEmail({ email, setEmail, requestOTP }) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [visible, setVisible] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [description, setDescription] = useState("");
    const [issueType, setIssueType] = useState(null);

    const issueOptions = [
        { label: "Technical Issue", value: "technical" },
        { label: "Academic Issue", value: "academic" }
    ];

    return (
        <div className="flex flex-column align-items-center w-full ">
            <img className="w-full" src="images/banner.jpg" alt="banner" />
            <Card title={APP_NAME} className="w-10 mx-3 mt-4"
                pt={{
                    title: { className: classNames(TITLE_TEXT, "text-center") }
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
                            icon: { className: TEXT_SIZE_NORMAL }
                        }}
                    />
                    <Button
                        className="mt-3 ml-auto"
                        severity="danger"
                        icon="pi pi-question-circle"
                        label="Help"
                        onClick={() => setVisible(true)}
                        pt={{
                            label: { className: TEXT_SIZE_NORMAL },
                            icon: { className: TEXT_SIZE_NORMAL }
                        }}
                    />

                    <Dialog
                        visible={visible}
                        modal
                        header="Help & Support"
                        onHide={() => setVisible(false)}
                        style={{ width: '50vw' }} // Laptop
                        breakpoints={{
                            '992px': '85vw', // Tablet
                            '768px': '85vw'  // Mobile
                        }}
                    >
                        <div className="flex flex-column gap-3" >
                            <div className="p-inputgroup w-full mt-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText
                                    placeholder="User Name"
                                    value={name}
                                    onInput={(e) => setName(e.target.value)}
                                    pt={{
                                        root: { className: TEXT_SIZE_NORMAL },
                                    }}
                                />
                            </div>

                            <div className="p-inputgroup w-full">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-phone"></i>
                                </span>
                                <InputText
                                    placeholder="Phone Number"
                                    value={phone}
                                    onInput={(e) => setPhone(e.target.value)}
                                    keyfilter="pint"
                                    pt={{
                                        root: { className: TEXT_SIZE_NORMAL },
                                    }}
                                />
                            </div>

                            <div className="p-inputgroup w-full">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText
                                    placeholder="Register Email"
                                    value={registerEmail}
                                    onInput={(e) => setRegisterEmail(e.target.value)}
                                    pt={{
                                        root: { className: TEXT_SIZE_NORMAL },
                                    }}
                                />
                            </div>

                            <div className="p-inputgroup w-full">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-list"></i>
                                </span>
                                <Dropdown
                                    value={issueType}
                                    options={issueOptions}
                                    onChange={(e) => setIssueType(e.value)}
                                    placeholder="Select Issue"
                                    pt={{
                                        input: { className: TEXT_SIZE_NORMAL },
                                        itemlabel: { className: TEXT_SIZE_NORMAL },
                                    }}
                                />
                            </div>

                            <div className="p-inputgroup w-full">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-comment"></i>
                                </span>
                                <InputTextarea
                                    placeholder="Enter Issue Description"
                                    rows={4}
                                    value={description}
                                    onInput={(e) => setDescription(e.target.value)}
                                    autoResize
                                    pt={{
                                        root: { className: TEXT_SIZE_NORMAL },
                                    }}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button label="Submit" className="w-full" onClick={() => setVisible(false)}
                                    pt={{
                                        input: { className: TEXT_SIZE_NORMAL },
                                        itemlabel: { className: TEXT_SIZE_NORMAL },
                                    }} />
                                <Button label="Cancel" severity="secondary" className="w-full" onClick={() => setVisible(false)}
                                    pt={{
                                        input: { className: TEXT_SIZE_NORMAL },
                                        itemlabel: { className: TEXT_SIZE_NORMAL },
                                    }} />
                            </div>
                        </div>
                    </Dialog>
                </div>
            </Card>
        </div>
    );
}
