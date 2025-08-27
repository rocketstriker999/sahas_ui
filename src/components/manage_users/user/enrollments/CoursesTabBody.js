import TabHeader from "../../../common/TabHeader";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import NoContent from "../../../common/NoContent";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import Course from "./Course";
import Loading from "../../../common/Loading";

export default function CoursesTabBody({ id, setTotalCourses }) {
    const [courses, setCourses] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `enrollments/${id}/courses`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (courses, responseCode) => {
                if (courses && responseCode === 200) {
                    setCourses(courses);
                } else {
                    setError("Couldn't load Courses");
                }
            },
        });
    }, [id, requestAPI]);

    useEffect(() => {
        setTotalCourses(() => courses?.length);
    }, [setTotalCourses, courses]);

    return (
        <div className="flex flex-column gap-3">
            <TabHeader
                title="Enrollment Courses"
                highlights={[`Total - ${courses?.length} Courses`]}
                actionItems={[<Tag icon="pi pi-plus" value="Add Course"></Tag>]}
            />

            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : courses?.length ? (
                courses.map((course) => <Course key={course?.id} course={course} />)
            ) : (
                <NoContent error="No Courses Assigned" />
            )}
        </div>
    );
}
