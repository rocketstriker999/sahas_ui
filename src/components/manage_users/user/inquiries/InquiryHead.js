import { useOutletContext } from "react-router-dom";

import { Tag } from "primereact/tag";
import { getReadableDate } from "../../../../utils";
import { TEXT_SIZE_SMALL, TEXT_SIZE_NORMAL } from "../../../../style";
import HasRequiredAuthority from "../../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../../constants";

export default function InquiryHead({ index, active, course_id, created_at, created_by_full_name }) {
    const { getCourseTitle } = useOutletContext();

    return (
        <HasRequiredAuthority requiredAuthority={AUTHORITIES.READ_INQUIRY_NOTE}>
        <div className="flex align-items-center">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <p className={`m-0 p-0 ${TEXT_SIZE_NORMAL}`}>
                    {index}. {getCourseTitle(course_id)}
                </p>
                <p className={`${TEXT_SIZE_SMALL} m-0 p-0 font-medium text-color-secondary`}>
                    <i className={`${TEXT_SIZE_SMALL} pi pi-calendar`}></i> at {getReadableDate({ date: created_at })} by {created_by_full_name}
                </p>
            </div>
            <Tag severity={active ? "success" : "danger"} value={active ? "Active" : "Closed"} />
        </div>
        </HasRequiredAuthority>
    );
}
