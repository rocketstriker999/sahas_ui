import Carousel from "../components/dashboard/Carousel";
import { useSelector } from "react-redux";
import Operations from "../components/dashboard/Operations";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Badge } from "primereact/badge";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import ProfileCard from "../components/dashboard/ProfileCard";

export default function Dashboard() {
    const { isDevelopmentBuild, deviceFingerPrint } = useAppContext();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    const pageConfig = useSelector((state) => state.stateTemplateConfig?.dash_board);

    return (
        <div>
            <div className="bg-blue-800 text-white flex align-items-center justify-content-between p-2">
                <div className="w-8">
                    <p className="m-0 font-semibold">Sahas Smart Studies</p>
                    {isDevelopmentBuild && (
                        <div className="mt-1 text-xs bg-blue-800 text-white white-space-nowrap text-overflow-ellipsis overflow-hidden">
                            Device ID - {deviceFingerPrint}
                        </div>
                    )}
                </div>
                <i className="pi pi-bell p-overlay-badge mx-2" style={{ fontSize: "1.5rem" }}>
                    <Badge value="2" severity="warning"></Badge>
                </i>
            </div>
            <div className="p-2">
                <HasRequiredAuthority requiredAuthority="READ_FEATURE_CAROUSEL">
                    <Carousel images={pageConfig?.carousel?.images} />
                </HasRequiredAuthority>

                <HasRequiredAuthority requiredAuthority="ACCESS_PAGE_PROFILE">
                    <ProfileCard {...loggedInUser} />
                </HasRequiredAuthority>

                <HasRequiredAuthority requiredAuthority="ACCESS_CONTAINER_OPERATIONS">
                    <Operations operationsSections={pageConfig?.opertions_sections} />
                </HasRequiredAuthority>
            </div>
        </div>
    );
}
