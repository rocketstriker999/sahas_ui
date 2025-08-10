import Carousel from "../components/dashboard/Carousel";
import { useDispatch, useSelector } from "react-redux";
import Operations from "../components/dashboard/Operations";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Badge } from "primereact/badge";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import ProfileCard from "../components/dashboard/ProfileCard";
import { removeCurrentUser } from "../redux/sliceUser";
import { KEY_AUTHENTICATION_TOKEN } from "../constants";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { useRef } from "react";
import { classNames } from "primereact/utils";

export default function Dashboard() {
    const { isDevelopmentBuild, deviceFingerPrint } = useAppContext();

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.stateUser);

    const pageConfig = useSelector((state) => state.stateTemplateConfig?.dash_board);
    const profileMenu = useRef(null);

    const profileMenuItems = [
        {
            label: "Share",
            icon: "pi pi-share-alt"
        },
        {
            label: "Help",
            icon: "pi pi-question-circle"
        },
        {
            label: "Logout",
            icon: "pi pi-power-off",
            command: () => {
                localStorage.removeItem(KEY_AUTHENTICATION_TOKEN);
                dispatch(removeCurrentUser());
            }
        }
    ];


    return (
        <div>
            <div className="bg-blue-800 shadow-3 text-white flex align-items-center justify-content-between p-2">
                <div className="w-8">
                    <p className="m-0 font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl">Sahas Smart Studies</p>
                    {isDevelopmentBuild && (
                        <div className="mt-1 text-xs sm:text-sm md:text-base lg:text-lg bg-blue-800 text-white white-space-nowrap text-overflow-ellipsis overflow-hidden">
                            Device ID - {deviceFingerPrint}
                        </div>
                    )}
                </div>

                <div className="flex justify-content-end align-items-center gap-1">
                    <i className="pi pi-bell p-overlay-badge" style={{ fontSize: "1.5rem" }}>
                        <Badge value="2" severity="warning"></Badge>
                    </i>
                    <Avatar
                        icon="pi pi-user"
                        className="bg-transparent border-1 ml-3"
                        shape="circle"
                        onClick={(e) => profileMenu.current.toggle(e)}
                    />
                    <Menu model={profileMenuItems} popup ref={profileMenu}
                        pt={{
                            label: { className: classNames("text-sm sm:text-base md:text-lg lg:text-xl") },
                            icon: { className: classNames("text-sm sm:text-base md:text-lg lg:text-xl") }
                        }} />
                </div>
            </div>
            <div className="p-2">
                <HasRequiredAuthority requiredAuthority="USE_FEATURE_CAROUSEL">
                    <Carousel images={pageConfig?.carousel?.images} />
                </HasRequiredAuthority>

                <HasRequiredAuthority requiredAuthority="USE_FEATURE_PROFILE_CARD">
                    <ProfileCard {...loggedInUser} />
                </HasRequiredAuthority>

                <HasRequiredAuthority requiredAuthority="USE_FEATURE_OPERATIONS">
                    <Operations />
                </HasRequiredAuthority>
            </div>
        </div>
    );
}
