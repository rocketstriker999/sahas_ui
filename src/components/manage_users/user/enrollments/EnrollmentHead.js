import { getReadableDate } from "../../../../utils";
import { Tag } from "primereact/tag";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../../../style";

export default function EnrollmentHead({ index, created_on, created_by_full_name, digital_access, on_site_access, handler }) {
    return (
        <div className="flex align-items-center gap-2">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <span className={`${TEXT_SIZE_NORMAL}`}>
                    <i className={`${TEXT_SIZE_SMALL} pi pi-calendar`}></i> {getReadableDate({ date: created_on })}
                </span>
                <span className={`${TEXT_SIZE_SMALL} font-medium text-color-secondary`}>
                    {index}. By {created_by_full_name}
                </span>
                <span className={`${TEXT_SIZE_SMALL} font-medium text-color-secondary font-semibold`}>{handler}</span>
            </div>

            <div className="flex flex-column gap-2">
                <Tag
                    icon="pi pi-building-columns"
                    severity={!!on_site_access ? "success" : "danger"}
                    value={!!on_site_access ? "On-Site Access" : "No On-Site Access"}
                    pt={{
                        icon: { className: TEXT_SIZE_SMALL },
                        value: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <Tag
                    icon="pi pi-globe"
                    severity={!!digital_access ? "success" : "danger"}
                    value={!!digital_access ? "Digital Access" : "No Digital Access"}
                    pt={{
                        icon: { className: TEXT_SIZE_SMALL },
                        value: { className: TEXT_SIZE_SMALL },
                    }}
                />
            </div>
        </div>
    );
}
