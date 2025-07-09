import Carousel from "../components/dashboard/Carousel";
import { useSelector } from "react-redux";
import UserPanel from "../components/dashboard/UserPanel";
import LoginAdvice from "../components/dashboard/LoginAdvice";
import Operations from "../components/dashboard/Operations";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Badge } from "primereact/badge";

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
                <Carousel images={pageConfig?.carousel?.images} />
                {loggedInUser ? <UserPanel {...loggedInUser} /> : <LoginAdvice />}
                <Operations operationsSections={pageConfig?.opertions_sections} />
            </div>
        </div>
    );
}
