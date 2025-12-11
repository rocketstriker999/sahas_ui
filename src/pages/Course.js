import { Outlet, useParams } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";

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
            <PageTitle title={course?.title} action={course?.enrollment && <span className="pi pi-info-circle"></span>} />

            {loading ? (
                <Loading message="Loading Course" />
            ) : error ? (
                <NoContent error={error} />
            ) : course ? (
                <Outlet context={{ course }} />
            ) : (
                <NoContent error={"Course Not Found"} />
            )}
        </div>
    );
}
