import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { hasGroupAccess } from "../../utils/utils";
import { useSelector } from "react-redux";
import { Sidebar } from "primereact/sidebar";
import { requestAPI } from "../../utils/utils";
import Notifications from "./Notifications/Notifications";
import { Image } from "primereact/image";
import { classNames } from "primereact/utils";

export default function Navbar() {
    const navigate = useNavigate();
    const currentLoggedInUser = useSelector((state) => state.stateUser.user);
    const [navBarConfig, setNavBarConfig] = useState();
    const [loading, setLoading] = useState();

    const [showNotifications, setShowNotifications] = useState(false);

    const itemRenderer = (item) => (
        <NavLink
            to={item.to}
            className="flex align-items-center p-menuitem-link"
        >
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && (
                <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                    {item.shortcut}
                </span>
            )}
        </NavLink>
    );

    const items = (navBarConfig) => [
        {
            label: "Courses",
            icon: "pi pi-fw pi-book",
            items: navBarConfig.product_categories.map((category) => {
                return {
                    label: category.categoryName,
                    icon: category.categoryIcon,
                };
            }),
        },
        {
            label: "Login",
            icon: "pi pi-fw pi-sign-in",
            command: () => navigate("/login"),
            visible: !currentLoggedInUser,
        },
        {
            label: "Manage Firm",
            icon: "pi pi-fw pi-cog",
            command: () => navigate("/manage-firm"),
            visible:
                !!currentLoggedInUser &&
                hasGroupAccess(currentLoggedInUser.groups, [
                    "FADMIN",
                    "HADMIN",
                ]),
        },
        {
            label: "System Admin",
            icon: "pi pi-fw pi-prime",
            command: () => navigate("/manage-system"),
            visible:
                !!currentLoggedInUser &&
                hasGroupAccess(currentLoggedInUser.groups, ["HADMIN"]),
        },
        {
            label: "Contact",
            icon: "pi pi-fw pi-envelope",
            command: () => navigate("/contact"),
            visible: !currentLoggedInUser,
        },
        {
            label: "Help",
            icon: "pi pi-fw pi-question-circle",
            command: () => navigate("/help"),
            visible: !!currentLoggedInUser,
        },
        {
            label: "Notification",
            icon: "pi pi-bell",
            badge: 3,
            template: itemRenderer,
            visible:
                !!currentLoggedInUser && navBarConfig.notifications_visible,
            command: (e) => setShowNotifications(true),
        },
    ];

    useEffect(() => {
        requestAPI({
            requestPath: "ui-config/navbar",
            onResponseReceieved: (navBarConfig, responseCode) => {
                if (navBarConfig && responseCode === 200) {
                    setNavBarConfig(navBarConfig);
                }
            },
            setLoading: setLoading,
        });
    }, []);

    if (navBarConfig && !loading) {
        return (
            <>
                <Menubar
                    className="px-4 shadow-3 z-5 relative"
                    start={
                        <NavLink to="/" className="p-menuitem-link">
                            {navBarConfig.hero.image ? (
                                <Image src={navBarConfig.hero.image} />
                            ) : (
                                <span className="text-primary-500 font-bold mr-4 text-3xl">
                                    {navBarConfig.hero.text}
                                </span>
                            )}
                        </NavLink>
                    }
                    model={items(navBarConfig)}
                    end={
                        currentLoggedInUser && (
                            <NavLink to="/profile">
                                <Avatar
                                    image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                                    shape="circle"
                                />
                            </NavLink>
                        )
                    }
                />
                {navBarConfig.notifications_visible && (
                    <Sidebar
                        visible={showNotifications}
                        onHide={() => setShowNotifications(false)}
                        header={
                            <h2 className="text-center m-0 p-0">
                                Notifications
                            </h2>
                        }
                        pt={{
                            content: classNames("overflow-visible"),
                        }}
                    >
                        <Notifications />
                    </Sidebar>
                )}
            </>
        );
    }

    if (loading && !navBarConfig) {
        return <p>loading navbar</p>;
    }
}
