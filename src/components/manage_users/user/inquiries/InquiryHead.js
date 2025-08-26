import { useOutletContext } from "react-router-dom";

import { Tag } from "primereact/tag";
import { getReadableDate } from "../../../../utils";

export default function InquiryHead({ index, active, course_id, created_at, created_by_full_name }) {
    const { getCourseTitle } = useOutletContext();

    return (
        <div className="flex align-items-center">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <p className="m-0 p-0 text-sm">
                    {index}. {getCourseTitle(course_id)}
                </p>
                <p className="m-0 p-0 text-xs font-medium text-color-secondary">
                    <i className="pi text-xs pi-calendar"></i> at {getReadableDate({ date: created_at })} by {created_by_full_name}
                </p>
            </div>
            <Tag severity={active ? "success" : "danger"} value={active ? "Active" : "Closed"} />
        </div>
    );
}
