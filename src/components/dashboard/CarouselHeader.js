import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { hasGroupAccess } from "../../utils";
import React, { useEffect, useState } from "react";
import { requestProxy } from "../../utils";
import Loading from "../common/Loading";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

export default function CarouselHeader() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [carouselItems, setCarouselItems] = useState();
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const shareUrl = window.location.href; // Current page URL
    const title = "🚀 Check out this amazing content on Sahas!";

    const loggedInUser = useSelector((state) => state.stateUser.user);
    useEffect(() => {
        requestProxy({
            requestPath: "/api/ui-config/carousel",
            onResponseReceieved: (carouselItems, responseCode) => {
                if (carouselItems && responseCode === 200) {
                    setCarouselItems(carouselItems);
                }
            },
            setLoading: setLoading,
        });

        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e) => {
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleAddToHomeScreen = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === "accepted") {
                console.log("Website Installed");
                setDeferredPrompt(null);
                setShowInstallButton(false);
            }
        }
    };

    const profileMenu = useRef(null);
    const shareMenu = useRef(null);

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
    const shareMenuItems = [
        {
            label: "Facebook",
            icon: "pi pi-facebook mr-2",
            command: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank"),
        },
        {
            label: "Whatsapp",
            icon: "pi pi-whatsapp mr-2",
            command: () => window.open(`https://api.whatsapp.com/send?text=${title} ${shareUrl}`, "_blank"),
        },
        {
            label: "Email",
            icon: "pi pi-envelope mr-2",
            command: () => window.location.href = `mailto:?subject=${title}&body=Check this out! ${shareUrl}`,
        },
    ];
    



    const itemTemplate = (carouselItem) => {
        if (carouselItem.type === "image") {
            return <Image width="100%" src={`${process.env.REACT_APP_IMAGES_PUBLIC}${carouselItem.image}`} />;
        }
    };

    if (loading && !carouselItems) {
        return <Loading />;
    }

    if (carouselItems) {
        return (
            <div>
                <div className="text-white p-3 shadow-4 bg-primary-800 flex justify-content-between align-items-center">
                    <p className="font-bold m-0 text-xs sm:text-base">Welcome {loggedInUser?.name} To Sahas</p>
                    <div className="flex align-items-center justify-content-between">
                        {/* Help Button */}
                        <Button
                            icon="pi pi-question-circle"
                            className="p-button-text text-sm sm:text-base p-0 text-white ml-3 w-auto"
                            onClick={() => window.open('https://wa.me/9429279966', '_blank')}
                        />
                        {/* Share Button with Menu */}
                        <Button
                            icon="pi pi-share-alt"
                            className="p-button-text text-sm sm:text-base p-0 text-white ml-3 w-auto" 
                            onClick={(e) => shareMenu.current.toggle(e)}
                        />
                        <Menu model={shareMenuItems} popup ref={shareMenu} />

                        {/* Add to Home Screen Button */}
                        {showInstallButton && (
                            <Button
                                icon="pi pi-home"
                                className="p-button-text text-sm sm:text-base p-0 text-white ml-3 w-auto"
                                onClick={handleAddToHomeScreen}
                            />
                        )}

                        {loggedInUser && (
                            <Avatar icon="pi pi-user" className="bg-primary-900 ml-3 text-sm sm:text-base" shape="circle" onClick={(e) => profileMenu.current.toggle(e)} />
                        )}
                    </div>

                    <Menu model={profileMenuItems} popup ref={profileMenu} />
                </div>
                <Galleria
                    className="shadow-4"
                    value={carouselItems}
                    showThumbnails={false}
                    showIndicators
                    showIndicatorsOnItem={true}
                    indicatorsPosition="bottom"
                    item={itemTemplate}
                    circular
                    autoPlay
                    transitionInterval={2000}
                    pt={{
                        indicators: classNames("p-2 bg-transparent")
                    }}
                />
            </div>
        );
    }
}
