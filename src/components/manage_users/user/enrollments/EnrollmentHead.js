import { useCallback, useState } from "react";
import { getReadableDate } from "../../../../utils";
import { Tag } from "primereact/tag";
import { useAppContext } from "../../../../providers/ProviderAppContainer";

export default function EnrollmentHead({ setEnrollments, index, created_on, created_by_full_name, digital_access, on_site_access, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [updating, setUpdating] = useState();

    const updateEnrollment = useCallback(
        (updatedKeys) => {
            requestAPI({
                requestPath: `enrollments`,
                requestMethod: "PATCH",
                requestPostBody: { ...props, ...updatedKeys },
                setLoading: setUpdating,
                onResponseReceieved: (updatedEnrollment, responseCode) => {
                    if (updatedEnrollment && responseCode === 200) {
                        showToast({ severity: "success", summary: "Updated", detail: "Enrollment Updated Succesfully", life: 1000 });
                        setEnrollments((prev) => prev.map((enrollment) => (enrollment?.id === props?.id ? updatedEnrollment : enrollment)));
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Updated Enrollment !", life: 2000 });
                    }
                },
            });
        },
        [props, requestAPI, setEnrollments, showToast]
    );

    return (
        <div className="flex align-items-center gap-2">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <span className="text-sm">
                    <i className="pi text-xs pi-calendar"></i> {getReadableDate({ date: created_on })}
                </span>
                <span className=" text-xs font-medium text-color-secondary">
                    {index}. By {created_by_full_name}
                </span>
            </div>
        </div>
    );
}
