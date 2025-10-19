import { Outlet, useParams } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { Button } from "primereact/button";
import { getReadableDate } from "../utils";
import { RUPEE } from "../constants";
import { Divider } from "primereact/divider";
import TabHeader from "../components/common/TabHeader";

export default function Subjects() {
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    const { courseId } = useParams();

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
            <img className="w-full" src={course?.image} alt={course?.image} />

            <div className="px-3 py-3 bg-blue-900 text-white">
                {course?.enrollment ? (
                    <TabHeader
                        title="Enrollment Details"
                        highlights={[
                            `Validity - ${getReadableDate({ date: course?.enrollment?.start_date, removeTime: true })} to ${getReadableDate({
                                date: course?.enrollment?.end_date,
                                removeTime: true,
                            })}`,
                            !!course?.enrollment?.on_site_access ? "On-Site Access" : "No On-Site Access",
                            !!course?.enrollment?.digital_access ? "Digital Access" : "No Digital Access",
                        ]}
                        actionItems={[
                            <Button
                                onClick={() => window.open(course?.whatsapp_group)}
                                icon="pi pi-whatsapp"
                                rounded
                                severity="success"
                                aria-label="Join Whatsapp Group"
                            />,
                            <Button icon="pi pi-receipt" rounded severity="info" aria-label="Join Whatsapp Group" />,
                        ]}
                    />
                ) : (
                    <Button
                        icon="pi pi-angle-double-right"
                        iconPos="right"
                        className=" w-full"
                        severity="warning"
                        label={`Enroll For Digital Access ${course?.fees} ${RUPEE}`}
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
