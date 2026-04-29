import { TabMenu } from "primereact/tabmenu";
import PageTitle from "../components/common/PageTitle";
import { Outlet, useNavigate } from "react-router-dom";

export default function ManageStreamSelection() {
    const navigate = useNavigate();

  
    const items = [
        { label: "Configs", icon: "pi pi-cog", command: () => navigate(`configs`, { replace: true }) },
        { label: "Suggestions", icon: "pi pi-lightbulb", command: () => navigate(`suggestions`, { replace: true }) },
        { label: "Tests", icon: "pi pi-list", command: () => navigate(`tests`, { replace: true }) },
        { label: "QR", icon: "pi pi-qrcode", command: () => navigate(`qr-invites`, { replace: true }) },
        { label: "Questions", icon: "pi pi-question", command: () => navigate(`question-categories`, { replace: true }) },
    ];

    return (
        <div className="flex flex-column min-h-0 h-full overflow-hidden">
            <PageTitle title={`Psychometric Test Configuration`} />
            <TabMenu model={items} />
            <Outlet />
        </div>
    );
}
