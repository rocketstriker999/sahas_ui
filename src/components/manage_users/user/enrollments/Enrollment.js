import { InputSwitch } from "primereact/inputswitch";
import { useCallback, useState } from "react";
import Detail from "../../../common/Detail";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { getReadableDate } from "../../../../utils";
import { TabView, TabPanel } from "primereact/tabview";
import TransactionsHead from "./TransactionsHead";
import TransactionsTabBody from "./TransactionsTabBody";
import ProgressiveControl from "../../../common/ProgressiveControl";
import CoursesHead from "./CoursesHead";
import CoursesTabBody from "./CoursesTabBody";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import HasRequiredAuthority from "../../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../../constants";
import { TEXT_SIZE_SMALL } from "../../../../style";

export default function Enrollment({ index, setEnrollments, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [updating, setUpdating] = useState();
    const [totalTransactions, setTotalTransactions] = useState();
    const [totalCourses, setTotalCourses] = useState();

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
        <div className="flex flex-column ">
            <div className="flex  align-items-center justify-content-between	px-4 py-3 border-bottom-1 border-300">
                <Detail icon="pi pi-calendar" title="Start Date" value={getReadableDate({ date: props?.start_date, removeTime: true })} />
                <Detail icon="pi pi-calendar" title="End Date" value={getReadableDate({ date: props?.end_date, removeTime: true })} />
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
                    <Button icon="pi pi-trash" className="h-2rem w-2rem" rounded severity="danger" aria-label="Delete" />
                </HasRequiredAuthority>
            </div>

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
                <div className="flex justify-content-center gap-4 px-4 py-3 border-bottom-1 border-300">
                    <div className="flex align-items-center gap-2">
                        <ProgressiveControl
                            loading={updating}
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
                            loading={updating}
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
            </HasRequiredAuthority>

            <TabView>
                <TabPanel
                    headerTemplate={(option) => <TransactionsHead {...option} totalTransactions={totalTransactions} />}
                    pt={{
                        header: { className: "flex-1" },
                    }}
                >
                    <TransactionsTabBody {...props} setTotalTransactions={setTotalTransactions} />
                </TabPanel>

                <TabPanel
                    headerTemplate={(option) => <CoursesHead {...option} totalCourses={totalCourses} />}
                    pt={{
                        header: { className: "flex-1 " },
                    }}
                >
                    <CoursesTabBody {...props} setTotalCourses={setTotalCourses} />
                </TabPanel>
            </TabView>
        </div>
    );
}