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
import EnrollmentHead from "./enrollments/EnrollmentHead";

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
                                    content: { className: "p-0" },
                                }}
                                key={enrollment?.id}
                                header={() => <EnrollmentHead {...enrollment} index={enrollments.length - index} />}
                            >
                                <Enrollment setEnrollments={setEnrollments} key={index} index={index} {...enrollment} />
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
        </div>
    );
}
