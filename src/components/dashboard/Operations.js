import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SUB_TITLE_TEXT, TEXT_SIZE_SMALL } from "../../style";
import { AUTHORITIES } from "../../constants";

export default function Operations({ className }) {
    const { id, authorities = [] } = useSelector((state) => state.stateUser);
    const navigate = useNavigate();

    const operationsSections = useMemo(() => {
        const config = [
            {
                title: "Student's Corner",
                iconColor: "text-orange-500",
                operations: [
                    { title: "Courses", icon: "pi-shopping-bag", path: "/course-categories" },
                    { title: "My Study", icon: "pi-book", path: "/my-courses" },
                    { title: "Exams", icon: "pi-file-edit", path: "/exam" },
                    { title: "Invoices", icon: "pi-wallet", path: "/invoices" },
                    { title: "Schedule", icon: "pi-calendar", path: "/my-reminders" },
                    { title: "Results", icon: "pi-chart-bar", path: "/my-exams" },
                    { title: "Tasks", icon: "pi-check-square", path: "/tasks" },
                    { title: "Profile", icon: "pi-user", path: `/manage-users/${id}/basics` },
                ],
            },
            {
                title: "Employee Corner",
                iconColor: "text-purple-500",
                required_authority: AUTHORITIES.USE_EMPLOYEE_CORNER,
                operations: [
                    { title: "Staff", icon: "pi-users", path: "/manage-users" },
                    { title: "Expenses", icon: "pi-indian-rupee", path: "/my-expenses" },
                    { title: "Manage", icon: "pi-folder-open", path: "/manage-exams" },
                ],
            }
        ];
        return config.filter(s => !s.required_authority || authorities.includes(s.required_authority));
    }, [authorities, id]);

    return (
        <div className={className}>
            {operationsSections.map((section) => (
                <div key={section.title} className="mb-4 lg:px-8 ">
                    <p className={`${SUB_TITLE_TEXT} font-bold mb-3 ml-1 text-gray-700`}>{section.title}</p>
                    <div className="grid grid-nogutter">
                        {section.operations.map((op) => (
                            <div key={op.title} className="col-4 md:col-3 lg:col-2 p-2" onClick={() => navigate(op.path)}>
                                <div className="flex flex-column align-items-center justify-content-center p-3 bg-white border-round-xl shadow-1 hover:shadow-3 transition-all transition-duration-200 cursor-pointer h-full border-1 border-gray-100">
                                    <div className={`mb-2 ${section.iconColor}`}>
                                        <i className={`pi ${op.icon}`} style={{ fontSize: '1.8rem' }}></i>
                                    </div>
                                    <p className={`m-0 text-center font-medium text-gray-600 ${TEXT_SIZE_SMALL}`}>
                                        {op.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}