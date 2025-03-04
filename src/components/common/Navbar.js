import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { hasGroupAccess } from "../../utils";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useAppContext } from "../../providers/ProviderAppContainer";

export default function Navbar() {
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const { templateConfig } = useAppContext();
    console.log(loggedInUser);
    const [appInstallEvent, setAppInstallEvent] = useState();

    const profileMenu = useRef(null);

    const profileMenuItems = [
        {
            template: () => (
                <div className="flex align-items-center gap-2 px-2 py-2 w-12">
                    <Avatar label={loggedInUser?.name?.charAt(0)?.toUpperCase() || "S"} size="small" />
                    <div className="flex flex-column overflow-hidden w-10">
                        <div className="font-bold text-sm">{loggedInUser?.name || 'Hello User'}</div>
                        <div className="text-xs overflow-hidden text-overflow-ellipsis white-space-nowrap w-full" title={loggedInUser?.email}>
                            {loggedInUser?.email}
                        </div>
                    </div>
                </div>
            ),
            disabled: true,
        },
        {
            separator: true
        },
        {
            label: "Manage Firm",
            icon: "pi pi-cog",
            command: () => navigate("/manage-firm"),
            visible: hasGroupAccess(loggedInUser?.groups, ["FADMIN", "HADMIN"]),
        },
        {
            label: "Profile",
            icon: "pi pi-user",
            command: () => navigate("/profile"),
        },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => navigate("/logout"),
        },
    ];

    useEffect(() => {
        // Check if the app is already installed
        if (!window.matchMedia("(display-mode: standalone)").matches) {
            window.addEventListener("beforeinstallprompt", (e) => {
                e.preventDefault();
                setAppInstallEvent(e);
                window.removeEventListener("beforeinstallprompt", this);
            });
        }
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

                {appInstallEvent && (
                    <div className="flex justify-content-between text text-xs px-3 shadow-4 font-bold align-items-center">
                        <p>Do you want to install Sahas Smart Studies ?</p>
                        <Button className="p-0" onClick={() => appInstallEvent.prompt()} severity="warning" label="Install" size="small" text></Button>
                    </div>
                )}
            </Fragment>
        );
    }
}
