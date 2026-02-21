import { Outlet, useParams } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { DialogCourse } from "../components/course/DialogCourse";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../constants";

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
            <PageTitle
                title={course?.title}
                action={
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSE_DIALOG}>
                        <i
                            className="pi pi-pen-to-square p-overlay-badge"
                            style={{ fontSize: "1.5rem" }}
                            onClick={() => setCourse((prev) => ({ ...prev, dialog: { ...prev?.dialog, active: true } }))}
                        />
                    </HasRequiredAuthority>
                }
            />

            {loading ? (
                <Loading message="Loading Course" />
            ) : error ? (
                <NoContent error={error} />
            ) : course ? (
                <Outlet context={{ course }} />
            ) : (
                <NoContent error={"Course Not Found"} />
            )}

            <DialogCourse setCourse={setCourse} dialogCourse={{ ...course?.dialog, courseId }} />
        </div>
    );
}
