import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import TabHeader from "../components/manage_users/user/TabHeader";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import Enrollment from "../components/manage_users/user/enrollments/Enrollment";
import DialogAddCourse from "../components/manage_users/user/enrollments/DialogAddCourse";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tag } from "primereact/tag";
import { getFormattedDate } from "../utils";

export default function Enrollments() {
    const { userId, courses, getCourseTitle } = useOutletContext();
    const [enrollments, setEnrollments] = useState();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [addingNewCouse, setAddingNewCourse] = useState();

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
                actionItems={[<Button icon="pi pi-plus" severity="warning" />]}
            />
            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-auto gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Enrollments" />
                ) : error ? (
                    <NoContent error={error} />
                ) : enrollments?.length ? (
                    <Accordion>
                        {enrollments.map((enrollment, index) => (
                            <AccordionTab
                                key={enrollment?.id}
                                header={() => (
                                    <div className="flex align-items-center">
                                        <div className="flex-1 flex flex-column gap-2 align-items-start">
                                            <p className="m-0 p-0 text-sm">
                                                <i className="pi text-xs pi-calendar"></i> {getFormattedDate({ date: enrollment?.created_on })}
                                            </p>
                                            <p className="m-0 p-0 text-xs font-medium text-color-secondary">
                                                {enrollments.length - index}. By {enrollment?.created_by_full_name}
                                            </p>
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
            <DialogAddCourse enrollmentId={addingNewCouse} setAddingNewCourse={setAddingNewCourse} courses={courses} setEnrollments={setEnrollments} />
        </div>
    );
}
