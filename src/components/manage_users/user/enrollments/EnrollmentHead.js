import { useOutletContext } from "react-router-dom";
import { getReadableDate } from "../../../../utils";
import { Tag } from "primereact/tag";

export default function EnrollmentHead({ index, created_on, created_by_full_name, active, created_by }) {
    const { userId } = useOutletContext();

    return (
        <div className="flex align-items-center">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <span className="text-sm">
                    <i className="pi text-xs pi-calendar"></i> {getReadableDate({ date: created_on })}
                </span>
                <span className=" text-xs font-medium text-color-secondary">
                    {index}. By {created_by_full_name}
                </span>
            </div>
            <Tag severity={active ? "success" : "danger"} value={active ? "Active" : "Inactive"} />
            <Tag
                icon="pi pi-user"
                className="ml-2"
                severity={created_by == userId ? "success" : "danger"}
                value={`By ${created_by == userId ? "Self" : "Staff"} `}
            />
        </div>
    );
}
