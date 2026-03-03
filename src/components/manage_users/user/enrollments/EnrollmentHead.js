import { getReadableDate } from "../../../../utils";
import { Tag } from "primereact/tag";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../../../style";
import IconButton from "../../../common/IconButton";
import { useCallback, useState } from "react";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import ProgressiveControl from "../../../common/ProgressiveControl";
import HasRequiredAuthority from "../../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../../constants";

export default function EnrollmentHead({
    setDialogEditEnrollment,
    setEnrollments,
    id,
    index,
    created_on,
    created_by_full_name,
    digital_access,
    on_site_access,
    handler,
    amount,
    start_date,
    end_date,
}) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const deleteEnrollment = useCallback(() => {
        requestAPI({
            requestPath: `enrollments/${id}`,
            requestMethod: "DELETE",
            setLoading,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Enrollment Deleted", life: 1000 });
                    setEnrollments((prev) => prev?.filter((enrollment) => enrollment?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Enrollment !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setEnrollments, showToast]);

    return (
        <div className="flex justify-content-between align-items-center gap-2">
            <div className=" flex flex-column gap-2 align-items-start">
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

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
                <ProgressiveControl
                    loading={loading}
                    control={
                        <div className="flex flex-column gap-2">
                            <IconButton
                                icon={"pi-pencil"}
                                onClick={() =>
                                    setDialogEditEnrollment((prev) => ({
                                        ...prev,
                                        visible: true,
                                        id,
                                        digital_access,
                                        on_site_access,
                                        amount,
                                        start_date: new Date(start_date),
                                        end_date: new Date(end_date),
                                    }))
                                }
                                rounded
                                severity="danger"
                                aria-label="Edit"
                                color={"text-orange-500"}
                            />
                            <IconButton icon={"pi-trash"} onClick={deleteEnrollment} rounded severity="danger" aria-label="Delete" color={"text-red-500"} />
                        </div>
                    }
                />
            </HasRequiredAuthority>
        </div>
    );
}

{
    /* <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
                <div className="flex justify-content-center gap-4 px-4 py-3 border-bottom-1 border-300">
                    <div className="flex align-items-center gap-2">
                        <ProgressiveControl
                            loading={loading}
                            control={
                                <Checkbox
                                    inputId="on_site_access"
                                    onChange={({ checked }) => updateEnrollment({ on_site_access: checked })}
                                    checked={!!props?.on_site_access}
                                />
                            }
                        />

                        <span className={`${TEXT_SIZE_SMALL} font-semibold`} htmlFor="on_site_access">
                            On Site Access
                        </span>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <ProgressiveControl
                            loading={loading}
                            control={
                                <Checkbox
                                    inputId="digital_access"
                                    onChange={({ checked }) => updateEnrollment({ digital_access: checked })}
                                    checked={!!props?.digital_access}
                                />
                            }
                        />

                        <span className={`${TEXT_SIZE_SMALL} font-semibold`} htmlFor="digital_access">
                            Digital Access
                        </span>
                    </div>
                </div>
            </HasRequiredAuthority> */
}
