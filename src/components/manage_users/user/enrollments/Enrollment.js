import { InputSwitch } from "primereact/inputswitch";
import { Tag } from "primereact/tag";
import { useCallback, useMemo, useState } from "react";

import Detail from "../../../common/Detail";
import TabHeader from "../TabHeader";
import NoContent from "../../../common/NoContent";
import { RUPEE } from "../../../../constants";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import Loading from "../../../common/Loading";
import { getFormattedDate } from "../../../../utils";
import { TabView, TabPanel } from "primereact/tabview";
import { Badge } from "primereact/badge";
import Course from "./Course";
import Transaction from "./Transaction";

export default function Enrollment({ getCourseTitle, setEnrollments, setSelectedEnrollmentForTransaction, index, setAddingNewCourse, ...enrollment }) {
    const [loading, setLoading] = useState();

    const { requestAPI, showToast } = useAppContext();

    const updateEnrollment = useCallback(
        (updatedKeys) => {
            requestAPI({
                requestPath: `enrollments/${enrollment?.id}`,
                requestMethod: "PUT",
                requestPostBody: { ...enrollment, ...updatedKeys },
                setLoading: setLoading,
                onResponseReceieved: (enrollment, responseCode) => {
                    if (enrollment && responseCode === 200) {
                        showToast({ severity: "success", summary: "Updated", detail: "Enrollment Updated Succesfully", life: 1000 });
                        setEnrollments((prev) => {
                            prev[index] = { ...prev[index], ...enrollment };
                            return [...prev];
                        });
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Updated Enrollment !", life: 2000 });
                    }
                },
            });
        },
        [enrollment, index, requestAPI, setEnrollments, showToast]
    );

    const deleteEnrollmentCourse = useCallback(
        (courseId) => {
            requestAPI({
                requestPath: `enrollment-courses/${courseId}`,
                requestMethod: "DELETE",
                setLoading: setLoading,
                parseResponseBody: false,
                onResponseReceieved: (_, responseCode) => {
                    if (responseCode === 204) {
                        showToast({ severity: "success", summary: "Deleted", detail: "Course Deleted", life: 1000 });
                        setEnrollments((prev) => {
                            prev[index].courses = prev?.[index]?.courses?.filter((course) => course.id !== courseId);
                            return [...prev];
                        });
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Inquiry Note !", life: 2000 });
                    }
                },
            });
        },
        [index, requestAPI, setEnrollments, showToast]
    );

    const tabTransaction = (options) => {
        return (
            <div
                className={`flex justify-content-center align-items-center gap-2 p-3 ${options.selected && "border-bottom-2 bg-gray-100"} `}
                style={{ cursor: "pointer" }}
                onClick={options.onClick}
            >
                <Badge value={enrollment?.transactions?.length} />
                <span className="font-bold white-space-nowrap">Transactions</span>
                <i className="pi pi-indian-rupee"></i>
            </div>
        );
    };

    const [paid, due] = useMemo(() => {
        const paid = enrollment?.transactions?.reduce((sum, transaction) => sum + parseFloat(transaction?.amount), 0);
        const due = parseFloat(enrollment?.fees) - paid;
        return [paid, due];
    }, [enrollment]);

    const tabCourses = (options) => {
        return (
            <div
                className={`flex justify-content-center align-items-center gap-2 p-3 ${options.selected && "border-bottom-2 bg-gray-100"} `}
                style={{ cursor: "pointer" }}
                onClick={options.onClick}
            >
                <Badge value={enrollment?.courses?.length} />
                <span className="font-bold white-space-nowrap">Courses</span>
                <i className="pi pi-book"></i>
            </div>
        );
    };

    return loading ? (
        <Loading />
    ) : (
        <div className="flex flex-column ">
            <div className="flex align-items-center justify-content-between	px-4 py-3 border-bottom-1	border-300">
                <Detail icon="pi pi-calendar" title="Start Date" value={getFormattedDate({ date: enrollment?.start_date, removeTime: true })} />
                <Detail icon="pi pi-calendar" title="End Date" value={getFormattedDate({ date: enrollment?.end_date, removeTime: true })} />
                <Detail value={<InputSwitch checked={Boolean(enrollment?.active)} onChange={(e) => updateEnrollment({ active: e.value })} />} />
            </div>

            <TabView>
                <TabPanel
                    headerTemplate={tabTransaction}
                    pt={{
                        header: { className: "flex-1" },
                    }}
                >
                    <div className="flex flex-column gap-3">
                        <TabHeader
                            title="Enrollment Transactions"
                            highlights={[`Total - ${enrollment?.transactions?.length} Transactions`]}
                            actionItems={[
                                <Tag
                                    key="transactions-tag"
                                    icon="pi pi-indian-rupee"
                                    value="Add Transcations"
                                    onClick={() => setSelectedEnrollmentForTransaction(enrollment?.id)}
                                ></Tag>,
                            ]}
                        />

                        <div className="flex align-items-center justify-content-evenly pb-2">
                            <Detail
                                title="Fees"
                                className="text-center"
                                value={<Badge value={`${parseFloat(enrollment?.fees)} ${RUPEE}`} severity="warning"></Badge>}
                            />
                            <Detail title="Paid" className="text-center" value={<Badge value={`${paid} ${RUPEE}`} severity="success"></Badge>} />
                            <Detail title="Due" className="text-center" value={<Badge value={`${due} ${RUPEE}`} severity="danger"></Badge>} />
                        </div>

                        {enrollment?.transactions?.length ? (
                            enrollment?.transactions?.map((transaction, index) => (
                                <Transaction index={index} key={transaction?.id} {...transaction} getFormattedDate={getFormattedDate} />
                            ))
                        ) : (
                            <NoContent error="No Transactions Found" />
                        )}
                    </div>
                </TabPanel>

                <TabPanel
                    headerTemplate={tabCourses}
                    pt={{
                        header: { className: "flex-1 " },
                    }}
                >
                    <div className="flex flex-column gap-3">
                        <TabHeader
                            title="Enrollment Courses"
                            highlights={[`Total - ${enrollment?.courses?.length} Enrollments`]}
                            actionItems={[<Tag icon="pi pi-plus" value="Add Course" onClick={() => setAddingNewCourse(enrollment?.id)}></Tag>]}
                        />

                        {enrollment?.courses?.length ? (
                            enrollment.courses.map((course) => (
                                <Course
                                    key={course?.id}
                                    course={course}
                                    getFormattedDate={getFormattedDate}
                                    getCourseTitle={getCourseTitle}
                                    deleteEnrollmentCourse={deleteEnrollmentCourse}
                                />
                            ))
                        ) : (
                            <NoContent error="No Courses Assigned" />
                        )}
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
}
