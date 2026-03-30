import { TabMenu } from "primereact/tabmenu";
import PageTitle from "../components/common/PageTitle";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function StreamSelectionTestConfiguration() {
    const items = [
        { label: "QR Invites", icon: "pi pi-qrcode" },
        { label: "Questions", icon: "pi pi-question" },
    ];

    const [activeIndex, setActiveIndex] = useState(3);

    return (
        <div>
            <PageTitle title={`Stream Selection Test Configuration`} />
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            <Outlet />
        </div>
    );
}
