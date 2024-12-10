import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { ListBox } from "primereact/listbox";
import { Divider } from "primereact/divider";
import { Menu } from "primereact/menu";

export default function CarouselHeader() {
    const itemTemplate = (image) => {
        return <Image width="100%" src={image} />;
    };

    const loggedInUser = useSelector((state) => state.stateUser.user);

    const images = ["https://www.gstatic.com/webp/gallery3/1.png", "https://www.gstatic.com/webp/gallery3/1.png"];

    const profileMenu = useRef(null);

    const items = [
        {
            label: "Profile",
            items: [
                {
                    label: "Edit",
                    icon: "pi pi-cog",
                    command: () => console.log("dawdaw"),
                },
                {
                    label: "Edit",
                    icon: "pi pi-cog",
                    command: () => console.log("dawdaw"),
                },
                {
                    label: "Logout",
                    icon: "pi pi-sign-out",
                },
            ],
        },
    ];

    return (
        <div>
            <div className="w-full lg:w-6 text-white p-3 shadow-4 bg-primary-800 flex justify-content-between align-items-center">
                <p className="  font-bold m-0  ">Welcome {loggedInUser?.name} To Sahas</p>
                {loggedInUser && <Avatar icon="pi pi-user" className="bg-primary-900" shape="circle" onClick={(e) => profileMenu.current.toggle(e)} />}
                <Menu model={items} popup ref={profileMenu} />
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
