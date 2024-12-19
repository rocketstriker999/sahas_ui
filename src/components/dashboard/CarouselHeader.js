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

export default function CarouselHeader() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [carouselItems, setCarouselItems] = useState();

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
    }, []);

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
                <div className="w-full lg:w-6 text-white p-3 shadow-4 bg-primary-800 flex justify-content-between align-items-center">
                    <p className="  font-bold m-0  ">Welcome {loggedInUser?.name} To Sahas</p>

                    <div>
                        <span className="pi pi-share-alt"></span>
                        {loggedInUser && (
                            <Avatar icon="pi pi-user" className="bg-primary-900 ml-2" shape="circle" onClick={(e) => profileMenu.current.toggle(e)} />
                        )}
                    </div>

                    <Menu model={profileMenuItems} popup ref={profileMenu} />
                </div>
                <Galleria
                    className="w-full lg:w-6 shadow-4"
                    value={carouselItems}
                    showThumbnails={false}
                    showIndicators
                    showIndicatorsOnItem={true}
                    indicatorsPosition="bottom"
                    item={itemTemplate}
                    circular
                    autoPlay
                    transitionInterval={2000}
                />
            </div>
        );
    }
}
