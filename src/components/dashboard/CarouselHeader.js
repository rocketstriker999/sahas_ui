import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { hasGroupAccess } from "../../utils";

export default function CarouselHeader() {
    const navigate = useNavigate();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    const images = ["https://www.gstatic.com/webp/gallery3/1.png", "https://www.gstatic.com/webp/gallery3/1.png"];

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

    const itemTemplate = (image) => {
        return <Image width="100%" src={image} />;
    };

    return (
        <div>
            <div className="w-full lg:w-6 text-white p-3 shadow-4 bg-primary-800 flex justify-content-between align-items-center">
                <p className="  font-bold m-0  ">Welcome {loggedInUser?.name} To Sahas</p>

                <div>
                    <span className="pi pi-share-alt"></span>
                    {loggedInUser && <Avatar icon="pi pi-user" className="bg-primary-900 ml-2" shape="circle" onClick={(e) => profileMenu.current.toggle(e)} />}
                </div>

                <Menu model={profileMenuItems} popup ref={profileMenu} />
            </div>
            <Galleria
                className="w-full lg:w-6 shadow-4"
                value={images}
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
