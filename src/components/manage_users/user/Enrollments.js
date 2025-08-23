import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import TabHeader from "../../common/TabHeader";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import Enrollment from "./enrollments/Enrollment";
import DialogAddCourse from "./enrollments/DialogAddCourse";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tag } from "primereact/tag";
import { getReadableDate } from "../../../utils";
import DialogAddTransaction from "./enrollments/DialogAddTransaction";
import DialogAddEnrollment from "./enrollments/DialogAddEnrollment";

export default function Enrollments() {
    const { userId, courses, getCourseTitle, paymentTypes } = useOutletContext();
    const [enrollments, setEnrollments] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [addingNewCouse, setAddingNewCourse] = useState();
    const [addingEnrollment, setAddingEnrollments] = useState();

    const [selectedEnrollmentForTransaction, setSelectedEnrollmentForTransaction] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}/enrollments`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (enrollments, responseCode) => {
                if (enrollments && responseCode === 200) {
                    setEnrollments(enrollments);
                } else {
                    setError("Couldn't load Enrollments");
                }
            },
        });
    }, [requestAPI, userId]);

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader
                className={"px-3 pt-3"}
                title="User's Enrollments"
                highlights={[`Total - ${enrollments?.length} Enrollments`]}
                actionItems={[<Button icon="pi pi-plus" severity="warning" onClick={setAddingEnrollments} />]}
            />
            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Enrollments" />
                ) : error ? (
                    <NoContent error={error} />
                ) : enrollments?.length ? (
                    <Accordion>
                        {enrollments.map((enrollment, index) => (
                            <AccordionTab
                                pt={{
                                    content: { className: "p-0" }, // nav area
                                }}
                                key={enrollment?.id}
                                header={() => (
                                    <div className="flex align-items-center">
                                        <div className="flex-1 flex flex-column gap-2 align-items-start">
                                            <span className="text-sm">
                                                <i className="pi text-xs pi-calendar"></i> {getReadableDate({ date: enrollment?.created_on })}
                                            </span>
                                            <span className=" text-xs font-medium text-color-secondary">
                                                {enrollments.length - index}. By {enrollment?.created_by_full_name}
                                            </span>
                                        </div>
                                        <Tag severity={enrollment?.active ? "success" : "danger"} value={enrollment?.active ? "Active" : "Inactive"} />
                                        <Tag
                                            icon="pi pi-user"
                                            className="ml-2"
                                            severity={enrollment.created_by == userId ? "success" : "danger"}
                                            value={`By ${enrollment.created_by == userId ? "Self" : "Staff"} `}
                                        />
                                    </div>
                                )}
                            >
                                <Enrollment
                                    getCourseTitle={getCourseTitle}
                                    setAddingNewCourse={setAddingNewCourse}
                                    setEnrollments={setEnrollments}
                                    setSelectedEnrollmentForTransaction={setSelectedEnrollmentForTransaction}
                                    key={index}
                                    index={index}
                                    {...enrollment}
                                />
                            </AccordionTab>
                        ))}
                    </Accordion>
                ) : (
                    <NoContent error={"No Enrollments Found"} />
                )}
            </div>
            <DialogAddEnrollment
                userId={userId}
                addingEnrollment={addingEnrollment}
                setAddingEnrollments={setAddingEnrollments}
                courses={courses}
                setEnrollments={setEnrollments}
            />
            <DialogAddTransaction
                setSelectedEnrollmentForTransaction={setSelectedEnrollmentForTransaction}
                selectedEnrollmentForTransaction={selectedEnrollmentForTransaction}
                setEnrollments={setEnrollments}
                paymentTypes={paymentTypes}
            />
            <DialogAddCourse enrollmentId={addingNewCouse} setAddingNewCourse={setAddingNewCourse} courses={courses} setEnrollments={setEnrollments} />
        </div>
    );
}
