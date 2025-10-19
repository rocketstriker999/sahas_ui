import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SUB_TITLE_TEXT,TEXT_SIZE_SMALL,TEXT_SIZE_NORMAL, TITLE_TEXT, ICON_SIZE } from "../../style";

export default function Operations({ className }) {
    const { authorities = [] } = useSelector((state) => state.stateUser);
    const navigate = useNavigate();

    const operationsSections = useMemo(() => {
        const configOperations = [
            {
                title: "Student's Corner",
                operations: [
                    {
                        title: "Courses",
                        icon: "pi-sitemap",
                        required_authority: "USE_PAGE_COURSES",
                        path: "/course-categories",
                    },
                    {
                        title: "My Courses",
                        icon: "pi-pen-to-square",
                        required_authority: "USE_PAGE_COURSES",
                        path: "/my-courses",
                    },
                    {
                        title: "Exam",
                        icon: "pi-pencil",
                        required_authority: "USE_PAGE_EXAM",
                        path: "/exam",
                    },
                    {
                        title: "Invoices",
                        icon: "pi-receipt",
                        required_authority: "USE_PAGE_INVOICES",
                        path: "/invoices",
                    },

                    {
                        title: "My Reminders",
                        icon: "pi-calendar-clock",
                        required_authority: "USE_PAGE_REMINDERS",
                        path: "/my-reminders",
                    },
                    {
                        title: "My Exams",
                        icon: "pi-question",
                        required_authority: "USE_PAGE_EXAMS",
                        path: "/my-exams",
                    },
                ],
            },
            {
                title: "Employee Corner",
                operations: [
                    {
                        title: "Products",
                        icon: "pi-box",
                        required_authority: "USE_PAGE_MANAGE_PRODUCTS",
                        path: "/manage-products",
                    },
                    {
                        title: "Users",
                        icon: "pi-users",
                        required_authority: "USE_CONTAINER_MANAGE_USERS",
                        path: "/manage-users",
                    },

                    {
                        title: "My Expenses",
                        icon: "pi-images",
                        required_authority: "USE_PAGE_MY_EXPENSES",
                        path: "/my-expenses",
                    },

                    {
                        title: "My Tasks",
                        icon: "pi-check-square",
                        required_authority: "USE_PAGE_TASKS",
                        path: "/tasks",
                    },
                    {
                        title: "Analytics",
                        icon: "pi-chart-bar",
                        required_authority: "USE_PAGE_MANAGE_ANALYTICS",
                        path: "/manage-analytics",
                    },
                    {
                        title: "Exams",
                        icon: "pi-question",
                        required_authority: "USE_PAGE_MANAGE_EXAMS",
                        path: "/manage-exams",
                    },
                ],
            },
            {
                title: "Admin Corner",
                operations: [
                    {
                        title: "Carousel",
                        icon: "pi-images",
                        required_authority: "USE_PAGE_MANAGE_CAROUSEL",
                        path: "/manage-carousel",
                    },
                    {
                        title: "Branches",
                        icon: "pi-building-columns",
                        required_authority: "USE_PAGE_MANAGE_BRANCHES",
                        path: "/manage-branches",
                    },
                    {
                        title: "Device Requests",
                        icon: "pi-tablet",
                        required_authority: "USE_PAGE_MANAGE_STREAMING_DEVICES",
                        path: "/manage-streaming-devices",
                    },
                    {
                        title: "Revenue",
                        icon: "pi-indian-rupee",
                        required_authority: "USE_PAGE_REVENUE",
                        path: "/revenue",
                    },
                    {
                        title: "Expenses",
                        icon: "pi-images",
                        required_authority: "USE_PAGE_MANAGE_EXPENSES",
                        path: "/manage-expenses",
                    },
                    {
                        title: "Devices",
                        icon: "pi-mobile",
                        required_authority: "USE_PAGE_MANAGE_DEVICES",
                        path: "/manage-devices",
                    },
                    {
                        title: "Tasks",
                        icon: "pi-list-check",
                        required_authority: "USE_PAGE_MANAGE_TASKS",
                        path: "/manage-tasks",
                    },
                    {
                        title: "Chapterization",
                        icon: "pi-clone",
                        required_authority: "USE_PAGE_MANAGE_TASKS",
                        path: "/manage-chapter-types",
                    },
                    {
                        title: "Reminders",
                        icon: "pi-calendar-clock",
                        required_authority: "USE_PAGE_MANAGE_REMINDERS",
                        path: "/manage-reminders",
                    },
                    {
                        title: "Coupons",
                        icon: "pi-ticket",
                        required_authority: "USE_PAGE_MANAGE_COUPON_CODES",
                        path: "/manage-coupon-codes",
                    },
                ],
            },
            {
                title: "Developer Corner",
                operations: [
                    {
                        title: "Configs",
                        icon: "pi-cog",
                        required_authority: "USE_PAGE_MANAGE_CONFIGS",
                        path: "/manage-branches",
                    },
                    {
                        title: "Roles",
                        icon: "pi-id-card",
                        required_authority: "USE_PAGE_MANAGE_COUPON_CODES",
                        path: "/manage-roles",
                    },
                    {
                        title: "Authorities",
                        icon: "pi-key",
                        required_authority: "USE_PAGE_MANAGE_COUPON_CODES",
                        path: "/manage-authorities",
                    },
                ],
            },
        ];

        return configOperations.reduce((acc, item) => {
            const operations = item?.operations?.filter((operation) => authorities.includes(operation?.required_authority));
            if (operations?.length) {
                acc.push({ ...item, operations });
            }

            return acc;
        }, []);
    }, [authorities]);

    return (
        <div className={className}>
            {operationsSections?.map((section) => {
                return (
                    <div className="border-round bg-gray-100 border-1 border-gray-300 mb-2" key={section?.title}>
                        <p className={`m-0 py-3 px-2 font-semibold ${SUB_TITLE_TEXT}`}>{section?.title}</p>

                        <div className="grid grid-nogutter">
                            {section?.operations?.map((operation) => {
                                return (
                                    <div
                                        className="col-3  flex flex-column gap-1 align-items-center p-2 "
                                        key={operation?.title}
                                        onClick={() => navigate(operation?.path)}
                                    >
                                        {/* <i className={`pi ${operation?.icon} border-circle bg-gray-800	p-3 text-white`} style={{ fontSize: "1.25rem" }}></i> */}
                                        <i className={`pi ${operation?.icon} border-circle bg-gray-800 p-3 text-white ${ICON_SIZE}`}></i>
                                        <p className={`p-0 m-0 text-center ${TEXT_SIZE_SMALL}`}>{operation?.title}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
