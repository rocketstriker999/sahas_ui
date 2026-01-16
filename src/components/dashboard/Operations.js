import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SUB_TITLE_TEXT, TEXT_SIZE_SMALL } from "../../style";
import { AUTHORITIES } from "../../constants";

export default function Operations({ className }) {
  const { id, authorities = [] } = useSelector((state) => state.stateUser);
  const navigate = useNavigate();

  const operationsSections = useMemo(() => {
    const configOperations = [
      {
        title: "Student's Corner",
        iconColor: "text-orange-500",
        operations: [
          {
            title: "Purchase Courses",
            icon: "pi-sitemap",
            path: "/course-categories",
          },
          {
            title: "My Courses",
            icon: "pi-pen-to-square",
            path: "/my-courses",
          },
          { title: "Exam", icon: "pi-pencil", path: "/exam" },
          { title: "Invoices", icon: "pi-receipt", path: `/invoices` },
          {
            title: "My Reminders",
            icon: "pi-calendar-clock",
            path: "/my-reminders",
          },
          { title: "My Exams", icon: "pi-question", path: "/my-exams" },
          { title: "My Tasks", icon: "pi-check-square", path: "/tasks" },
          {
            title: "My Profile",
            icon: "pi-user",
            path: `/manage-users/${id}/basics`,
          },
        ],
      },
      {
        title: "Employee Corner",
        iconColor: "text-purple-500",
        required_authority: AUTHORITIES.USE_EMPLOYEE_CORNER,
        operations: [
          {
            title: "Users",
            icon: "pi-users",
            required_authority: AUTHORITIES.USE_PAGE_USERS,
            path: "/manage-users",
          },
          {
            title: "My Expenses",
            icon: "pi-images",
            required_authority: AUTHORITIES.USE_PAGE_MY_EXPENSES,
            path: "/my-expenses",
          },
          {
            title: "Exams",
            icon: "pi-question",
            required_authority: AUTHORITIES.USE_PAGE_MANAGE_EXAMS,
            path: "/manage-exams",
          },
        ],
      },
      {
        title: "Admin Corner",
        iconColor: "text-blue-500",
        required_authority: AUTHORITIES.USE_ADMIN_CORNER,
        operations: [
          {
            title: "Branches",
            icon: "pi-building-columns",
            required_authority: "USE_PAGE_MANAGE_BRANCHES",
            path: "/manage-branches",
          },
          {
            title: "Device Requests",
            icon: "pi-tablet",
            required_authority: "USE_PAGE_MANAGE_STREAMING_DEVICES_REQUESTS",
            path: "/manage-streaming-devices-requests",
          },
          {
            title: "Financials",
            icon: "pi-indian-rupee",
            required_authority: "USE_PAGE_FINANCIALS",
            path: "/financials",
          },
          {
            title: "Revenue",
            icon: "pi-money-bill",
            required_authority: "USE_PAGE_FINANCIALS",
            path: "/revenue",
          },
          {
            title: "Analytics",
            icon: "pi-chart-bar",
            required_authority: "USE_PAGE_ANALYTICS",
            path: "/manage-analytics",
          },
          {
            title: "Chapterization",
            icon: "pi-clone",
            required_authority: "USE_PAGE_CHAPTERIZATION",
            path: "/manage-chapter-types",
          },
          {
            title: "Coupons",
            icon: "pi-ticket",
            required_authority: "USE_PAGE_COUPON_CODES",
            path: "/manage-coupon-codes",
          },
        ],
      },
      {
        title: "Developer Corner",
        iconColor: "text-gray-600",
        required_authority: AUTHORITIES.USE_DEVELOPER_CORNER,
        operations: [
          { title: "Configs", icon: "pi-cog", path: "/manage-branches" },
          { title: "Roles", icon: "pi-id-card", path: "/manage-roles" },
          { title: "Authorities", icon: "pi-key", path: "/manage-authorities" },
        ],
      },
    ];

    return configOperations.reduce((acc, item) => {
      if (
        item.required_authority &&
        !authorities.includes(item.required_authority)
      )
        return acc;

      const operations = item.operations.filter(
        (op) =>
          !op.required_authority || authorities.includes(op.required_authority)
      );

      if (operations.length) acc.push({ ...item, operations });
      return acc;
    }, []);
  }, [authorities, id]);

  return (
    <div className={className}>
      {operationsSections.map((section) => (
        <div key={section.title} className="mb-4 lg:px-8">
          <p className={`${SUB_TITLE_TEXT} font-bold mb-3 ml-1 text-gray-700`}>
            {section.title}
          </p>

          <div className="grid grid-nogutter">
            {section.operations.map((op) => (
              <div
                key={op.title}
                className="col-4 md:col-3 lg:col-2 p-2"
                onClick={() => navigate(op.path)}
              >
                <div className="flex flex-column align-items-center justify-content-center p-3 bg-white border-round-xl shadow-1 hover:shadow-3 transition-all transition-duration-200 cursor-pointer h-full border-1 border-gray-100">
                  <div className={`mb-2 ${section.iconColor}`}>
                    <i
                      className={`pi ${op.icon}`}
                      style={{ fontSize: "1.8rem" }}
                    />
                  </div>
                  <p
                    className={`m-0 text-center font-medium text-gray-600 ${TEXT_SIZE_SMALL}`}
                  >
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
