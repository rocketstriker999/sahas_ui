import { Outlet, useParams } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { getReadableDate } from "../utils";
import { classNames } from "primereact/utils";
import { RUPEE } from "../constants";

export default function Subjects() {
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    const { id } = useParams();

    //fetch course detail - if it subscribe or not
    //validity
    //give a button redirect to invoices if subscribed a course
    //fetch subjects
    //need to show subjects count
    //show course->subjects->chapters->videos,pdfs,audios
    //Buy Button

    useEffect(() => {
        if (id)
            requestAPI({
                requestPath: `courses/${id}`,
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
    }, [id, requestAPI]);

    return (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Course - ${course?.title}`} action={course?.enrollment && <span className="pi pi-info-circle"></span>} />
            <img className="w-full" src={course?.image} alt={course?.image} />

            {!course?.enrollment ? (
                <div className="border-1 border-gray-300 border-round p-3 m-2 flex flex-column gap-3">
                    <span className="text-color-secondary font-semibold text-sm">Enrollment Details</span>

                    <div className=" flex gap-2 align-items-center justify-content-between">
                        <div className="flex flex-column gap-2">
                            <Tag
                                pt={{ root: classNames("border-1 border-primary text-primary bg-transparent") }}
                                icon="pi pi-calendar"
                                value={`${getReadableDate({ date: course?.enrollment?.start_date, removeTime: true })} - ${getReadableDate({
                                    date: course?.enrollment?.end_date,
                                    removeTime: true,
                                })}`}
                            />
                            <Tag
                                pt={{ root: classNames("border-1 border-primary text-primary bg-transparent") }}
                                icon="pi pi-indian-rupee"
                                value={"Invoices"}
                            />
                        </div>

                        <div className="flex flex-column gap-2">
                            <Tag
                                icon="pi pi-building-columns"
                                severity={!!course?.enrollment?.on_site_access ? "success" : "danger"}
                                value={!!course?.enrollment?.on_site_access ? "On-Site Access" : "No On-Site Access"}
                            />
                            <Tag
                                icon="pi pi-globe"
                                severity={!!course?.enrollment?.digital_access ? "success" : "danger"}
                                value={!!course?.enrollment?.digital_access ? "Digital Access" : "No Digital Access"}
                            />
                        </div>
                        <Button icon="pi pi-whatsapp" rounded severity="success" aria-label="Join Whatsapp Group" />
                    </div>
                </div>
            ) : (
                <Button
                    icon="pi pi-angle-double-right"
                    iconPos="right"
                    className="m-2"
                    severity="warning"
                    label={`Enroll For Digital Access ${course?.fees} ${RUPEE}`}
                />
            )}

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
