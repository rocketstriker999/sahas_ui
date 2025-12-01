import { Outlet, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { Button } from "primereact/button";
import { getReadableDate } from "../utils";
import { RUPEE } from "../constants";
import TabHeader from "../components/common/TabHeader";
import { useSelector } from "react-redux";

export default function Subjects() {
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    const { courseId } = useParams();
    const loggedInUser = useSelector((state) => state.stateUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (courseId)
            requestAPI({
                requestPath: `courses/${courseId}`,
                requestMethod: "GET",
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (course, responseCode) => {
                    if (course && responseCode === 200) {
                        setCourse(course);
                    } else {
                        setError("Couldn't load Course");
                    }
                },
            });
    }, [courseId, requestAPI]);

    return (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Course - ${course?.title}`} action={course?.enrollment && <span className="pi pi-info-circle"></span>} />
            <img className="w-full h-8rem" src={course?.image} alt={course?.image} />

            <div className="px-3 py-2 bg-blue-900 text-white flex gap-2 flex-column">
                {!!(course?.enrollment?.on_site_access || course?.enrollment?.digital_access) && (
                    <TabHeader
                        title="Enrollment Details"
                        highlights={[
                            `Validity - ${getReadableDate({ date: course?.enrollment?.start_date, removeTime: true })} to ${getReadableDate({
                                date: course?.enrollment?.end_date,
                                removeTime: true,
                            })}`,
                            [
                                !!course?.enrollment?.on_site_access ? "On-Site Access" : "No On-Site Access",
                                !!course?.enrollment?.digital_access ? "Digital Access" : "No Digital Access",
                            ].join(" & "),
                        ]}
                        actionItems={[
                            <Button
                                onClick={() => window.open(course?.whatsapp_group)}
                                icon="pi pi-whatsapp"
                                rounded
                                severity="success"
                                aria-label="Join Whatsapp Group"
                            />,
                            <Button
                                onClick={() => navigate(`/manage-users/${loggedInUser?.id}/enrollments`)}
                                icon="pi pi-receipt"
                                rounded
                                severity="info"
                                aria-label="Invoices"
                            />,
                        ]}
                    />
                )}

                {!course?.enrollment?.digital_access && (
                    <Button
                        icon="pi pi-angle-double-right"
                        iconPos="right"
                        className="w-full "
                        severity="warning"
                        label={`Enroll For Digital Access ${course?.fees} ${RUPEE}`}
                        onClick={() => navigate(`/enroll/${course?.id}`)}
                    />
                )}
            </div>

            {loading ? (
                <Loading message="Loading Course" />
            ) : error ? (
                <NoContent error={error} />
            ) : course ? (
                <Outlet context={{ ...course }} />
            ) : (
                <NoContent error={"Course Not Found"} />
            )}
        </div>
    );
}
