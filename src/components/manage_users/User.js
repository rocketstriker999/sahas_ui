import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";
import { useCallback } from "react";

export default function User() {
    const { userId } = useParams();

    const { authorities = [] } = useSelector((state) => state.stateUser);
    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const { branches = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const getCourseTitle = useCallback((courseId) => courses?.find((course) => course.id === courseId)?.title, [courses]);

    const navigate = useNavigate();

    const items = [
        { label: "Basics", icon: "pi pi-user", command: () => navigate(`basics`, { replace: true }) },
        { label: "Inquiries", icon: "pi pi-question", command: () => navigate(`inquiries`, { replace: true }) },
        { label: "Enrollments", icon: "pi pi-folder-open", command: () => navigate(`enrollments`, { replace: true }) },
        { label: "Devices", icon: "pi pi-tablet", command: () => navigate(`basics`) },
        { label: "Wallet", icon: "pi pi-wallet", command: () => navigate(`basics`) },
        { label: "Notes", icon: "pi pi-clipboard", command: () => navigate(`basics`) },
        { label: "Roles", icon: "pi pi-id-card", command: () => navigate(`basics`) },
    ];

    return (
        <div>
            <TabMenu model={items} />
            <Outlet context={{ userId, authorities, courses, branches, getCourseTitle }} />
        </div>
    );
}
