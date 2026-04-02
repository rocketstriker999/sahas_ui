import { TabMenu } from "primereact/tabmenu";
import PageTitle from "../components/common/PageTitle";
import { Outlet, useNavigate } from "react-router-dom";

export default function StreamSelectionTestConfiguration() {
    const navigate = useNavigate();

    const items = [
        { label: "QR Invites", icon: "pi pi-qrcode", command: () => navigate(`qr-invites`, { replace: true }) },
        { label: "Questions", icon: "pi pi-question", command: () => navigate(`questions`, { replace: true }) },
    ];

    return (
        <div className="flex flex-column min-h-0 h-full overflow-hidden">
            <PageTitle title={`Psychometric Test Configuration`} />
            <TabMenu model={items} />
            <Outlet />
        </div>
    );
}
