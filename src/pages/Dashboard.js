import Carousel from "../components/dashboard/Carousel";
import { useDispatch, useSelector } from "react-redux";
import Operations from "../components/dashboard/Operations";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Badge } from "primereact/badge";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import ProfileCard from "../components/dashboard/ProfileCard";
import { removeCurrentUser } from "../redux/sliceUser";
import { KEY_AUTHENTICATION_TOKEN } from "../constants";

export default function Dashboard() {
    const { isDevelopmentBuild, deviceFingerPrint } = useAppContext();

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.stateUser);

    const pageConfig = useSelector((state) => state.stateTemplateConfig?.dash_board);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <div className="bg-blue-800 shadow-3 text-white flex align-items-center justify-content-between p-2">
                <div className="w-8">
                    <p className="m-0 font-semibold">Sahas Smart Studies</p>
                    {isDevelopmentBuild && (
                        <div className="mt-1 text-xs bg-blue-800 text-white white-space-nowrap text-overflow-ellipsis overflow-hidden">
                            Device ID - {deviceFingerPrint}
                        </div>
                    )}
                </div>

                <div className="flex justify-content-end align-items-center gap-4">
                    <i className="pi pi-bell p-overlay-badge " style={{ fontSize: "1.5rem" }}>
                        <Badge value="2" severity="warning"></Badge>
                    </i>
                    <i
                        className="pi pi-power-off"
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => {
                            localStorage.removeItem(KEY_AUTHENTICATION_TOKEN);
                            dispatch(removeCurrentUser());
                        }}
                    ></i>
                </div>
            </div>
            <HasRequiredAuthority requiredAuthority="USE_FEATURE_CAROUSEL">
                <Carousel className={"mt-2 mx-2"} images={pageConfig?.carousel?.images} />
            </HasRequiredAuthority>

            <HasRequiredAuthority requiredAuthority="USE_FEATURE_PROFILE_CARD">
                <ProfileCard className={"mx-2 "} {...loggedInUser} />
            </HasRequiredAuthority>

            <HasRequiredAuthority requiredAuthority="USE_FEATURE_OPERATIONS">
                <Operations className={"mx-2 mt-2 flex-1 min-h-0 overflow-scroll"} />
            </HasRequiredAuthority>
        </div>
    );
}
