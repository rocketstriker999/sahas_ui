import { InputSwitch } from "primereact/inputswitch";
import { useCallback, useEffect, useState } from "react";
import Detail from "../../../common/Detail";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { getReadableDate, getWriteableDate, hasRequiredAuthority } from "../../../../utils";
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
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";
import { FloatLabel } from "primereact/floatlabel";
import moment from "moment";

export default function Enrollment({ index, setEnrollments, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();
    const [totalTransactions, setTotalTransactions] = useState();
    const [totalCourses, setTotalCourses] = useState();

    const { authorities = [] } = useSelector((state) => state.stateUser);

    const updateEnrollment = useCallback(
        (updatedKeys) => {
            requestAPI({
                requestPath: `enrollments`,
                requestMethod: "PATCH",
                requestPostBody: { ...props, ...updatedKeys },
                setLoading,
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
        [props, requestAPI, setEnrollments, showToast],
    );

    const deleteEnrollment = useCallback(() => {
        requestAPI({
            requestPath: `enrollments/${props?.id}`,
            requestMethod: "DELETE",
            setLoading: loading,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Enrollment Deleted", life: 1000 });
                    setEnrollments((prev) => prev?.filter((enrollment) => enrollment?.id !== props?.id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Enrollment !", life: 2000 });
                }
            },
        });
    }, [loading, props, requestAPI, setEnrollments, showToast]);

    return (
        <div className="flex flex-column ">
            <div className=" border-bottom-1 border-300">
                {hasRequiredAuthority(authorities, AUTHORITIES.UPDATE_USER_ENROLLMENTS) ? (
                    <div className="flex align-items-center justify-content-around gap-2 px-1 pt-5 pb-2">
                        <FloatLabel className="flex-1">
                            <Calendar
                                dateFormat="dd/mm/yy"
                                inputId="start_date"
                                className="w-full"
                                value={moment(props?.start_date).toDate()}
                                onChange={(e) => updateEnrollment({ start_date: getWriteableDate({ date: e.value, removeTime: true }) })}
                                disabled={loading}
                                showTime={false}
                                showIcon
                            />
                            <label htmlFor="start_date" className={`${TEXT_SIZE_SMALL}`}>
                                Start Date
                            </label>
                        </FloatLabel>
                        <FloatLabel className="flex-1">
                            <Calendar
                                dateFormat="dd/mm/yy"
                                inputId="end_date"
                                className="w-full"
                                value={moment(props?.end_date).toDate()}
                                onChange={(e) => updateEnrollment({ end_date: getWriteableDate({ date: e.value, removeTime: true }) })}
                                disabled={loading}
                                showTime={false}
                                showIcon
                            />
                            <label htmlFor="start_date" className={`${TEXT_SIZE_SMALL}`}>
                                Start Date
                            </label>
                        </FloatLabel>

                        <Button onClick={deleteEnrollment} icon="pi pi-trash" className="h-2rem w-2rem" rounded severity="danger" aria-label="Delete" />
                    </div>
                ) : (
                    <div className="flex align-items-center justify-content-around p-3">
                        <Detail icon="pi pi-calendar" title="Start Date" value={getReadableDate({ date: props?.start_date, removeTime: true })} />
                        <Detail icon="pi pi-calendar" title="End Date" value={getReadableDate({ date: props?.end_date, removeTime: true })} />
                    </div>
                )}
            </div>

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
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
