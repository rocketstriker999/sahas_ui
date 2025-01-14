import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { Fragment, useRef } from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { hasGroupAccess } from "../../utils";
import React, { useEffect, useState } from "react";
import { requestProxy } from "../../utils";
import Loading from "../common/Loading";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useToast } from "../../providers/ProviderToast";

export default function CarouselHeader() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [carouselConfig, setCarouselConfig] = useState();
    const [appInstallEvent, setAppInstallEvent] = useState();

    const toast = useToast();

    const loggedInUser = useSelector((state) => state.stateUser.user);
    useEffect(() => {
        requestProxy({
            requestPath: "/api/ui-config/carousel",
            onResponseReceieved: (carouselConfig, responseCode) => {
                if (carouselConfig && responseCode === 200) {
                    setCarouselConfig(carouselConfig);
                }
            },
            setLoading: setLoading,
        });

        // Check if the app is already installed
        if (!window.matchMedia("(display-mode: standalone)").matches) {
            //when app lauches it fires event called beforeinstallprompt - we need to listen event and store
            //no need to trigger immidiatly
            //this can't be triggered by programtically only user gestures are allowed
            window.addEventListener("beforeinstallprompt", (event) => {
                event.preventDefault();
                setAppInstallEvent(event);
                toast?.current?.clear();
                toast?.current?.show({
                    severity: "success",
                    sticky: true,
                    content: () => (
                        <div>
                            <div className="flex align-items-center gap-2">
                                <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                                <span className="font-bold text-900">Sahas Smart Studies</span>
                            </div>
                            <div className="font-medium text-lg my-3 text-900">Install As Application</div>
                            <Button className="p-button-sm flex" label="Reply" severity="success"></Button>
                        </div>
                    ),
                });
            });
        }
    }, []);

    //                event.prompt();

    const profileMenu = useRef(null);

    const profileMenuItems = [
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

    const itemTemplate = (carouselItem) =>
        carouselItem.type === "image" && <Image width="100%" src={`${process.env.REACT_APP_IMAGES_PUBLIC}${carouselItem.image}`} />;

    if (loading && !carouselConfig) {
        return <Loading />;
    }

    if (carouselConfig) {
        return (
            <Fragment>
                <div className="text-white p-3 shadow-4 bg-primary-800 flex justify-content-between align-items-center">
                    <p className="font-bold m-0 text-xs sm:text-base">Welcome {loggedInUser?.name} To Sahas</p>
                    <div className="flex align-items-center justify-content-between">
                        <Button
                            icon="pi pi-question-circle"
                            className="p-button-text text-sm sm:text-base p-0 text-white ml-3 w-auto"
                            onClick={() => window.open(carouselConfig?.whatsapp_connect, "_blank")}
                        />
                        <Button
                            icon="pi pi-share-alt"
                            className="p-button-text text-sm sm:text-base p-0 text-white ml-3 w-auto"
                            onClick={() => window.open(carouselConfig?.share_message, "_blank")}
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
                <Galleria
                    className="shadow-4"
                    value={carouselConfig?.carouse_images}
                    showThumbnails={false}
                    showIndicators
                    showIndicatorsOnItem={true}
                    indicatorsPosition="bottom"
                    item={itemTemplate}
                    circular
                    autoPlay
                    transitionInterval={2000}
                    pt={{
                        indicators: classNames("p-2 bg-transparent"),
                    }}
                />
            </Fragment>
        );
    }
}
