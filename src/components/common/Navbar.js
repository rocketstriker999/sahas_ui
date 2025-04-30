import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { hasGroupAccess } from "../../utils";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Dialog } from "primereact/dialog";
import { isIOS } from 'react-device-detect';

export default function Navbar() {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const { templateConfig } = useAppContext();

    const [appInstallEvent, setAppInstallEvent] = useState();
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);
    const profileMenu = useRef(null);

    const profileMenuItems = [
        {
            label: "Manage Firm",
            icon: "pi pi-cog",
            command: () => navigate("/manage-firm"),
            visible: hasGroupAccess(loggedInUser?.groups, ["FADMIN", "HADMIN"]),
        },
        // {
        //     label: "Profile",
        //     icon: "pi pi-user",
        //     command: () => navigate("/profile"),
        // },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => navigate("/logout"),
        },
        {
            separator: true,
        },
        {
            template: (item, options) => {
                return (
                    <div className="p-2">
                        <div className="flex align-items-center gap-2">
                            <Avatar icon="pi pi-user" shape="circle" />
                            <span className="font-bold m-0 p-0">{loggedInUser?.name}</span>
                        </div>
                        <div className="text-xs mt-2 p-0 text-overflow-ellipsis overflow-hidden white-space-nowrap">{loggedInUser?.email}</div>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setAppInstallEvent(e);
        };

        if (!window.matchMedia("(display-mode: standalone)").matches && !isIOS) {
            window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        }

        // Clean up the event listener
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    if (templateConfig?.navbar) {
        return (
            <Fragment>
                <div className="text-white p-3 shadow-4 bg-primary-800 flex justify-content-between align-items-center">
                    <p className="font-bold m-0 text-sm sm:text-base">Welcome {loggedInUser?.name} To Sahas</p>
                    <div className="flex align-items-center justify-content-between">
                        <Button
                            icon="pi pi-question-circle"
                            className="p-button-text text-sm sm:text-base p-0 text-white ml-3 w-auto"
                            onClick={() => window.open(templateConfig?.navbar?.whatsapp_connect, "_blank")}
                        />
                        <Button
                            icon="pi pi-share-alt"
                            className="p-button-text text-sm sm:text-base p-0 text-white ml-3 w-auto"
                            onClick={() => window.open(templateConfig?.navbar?.share_message, "_blank")}
                        />

                        {loggedInUser && (
                            <Avatar
                                icon="pi pi-user"
                                className="bg-primary-900 ml-3 text-sm sm:text-base"
                                shape="circle"
                                onClick={(e) => profileMenu.current.toggle(e)}
                            />
                        )}
                    </div>

                    <Menu model={profileMenuItems} popup ref={profileMenu} />
                </div>

                {(appInstallEvent || isIOS) && (
                    <div className="flex justify-content-between text text-xs px-3 shadow-4 font-bold align-items-center">
                        <p>Do you want to install Sahas Smart Studies ?</p>
                        <Button className="p-1 text-white bg-black-alpha-90" onClick={() => {
                            if (!isIOS) {
                                setShowIOSInstructions(true);
                            } else {
                                appInstallEvent.prompt();
                            }
                        }} severity="warning" label="Install" size="small" text />
                    </div>
                )}

                <Dialog
                    header="Install on iOS"
                    visible={showIOSInstructions}
                    onHide={() => setShowIOSInstructions(false)}
                    style={{ width: '60vw' }}
                >
                    <div className="flex flex-column gap-3 text-sm">
                        <p>To install <strong>Sahas Smart Studies</strong>:</p>
                        <div>
                            <p className="m-0">1. Tap the <strong>Share</strong> icon in Safari</p>
                            <p className="m-0">2. Choose <strong>"Add to Home Screen"</strong></p>
                        </div>
                    </div>
                </Dialog>

                {!loggedInUser && (
                    <div className="flex justify-content-between bg-red-400 text-white text text-xs px-3 shadow-4 font-bold align-items-center">
                        <p>You are not logged in. Please log in to continue.</p>
                        <Button className="p-1 text-red-400 bg-white" onClick={() => navigate("/login")} label="Login" size="small" text></Button>
                    </div>
                )}
            </Fragment>
        );
    }
}
