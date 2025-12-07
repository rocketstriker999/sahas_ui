import TabHeader from "../../../common/TabHeader";
import { Tag } from "primereact/tag";
import { useCallback, useEffect, useState } from "react";
import NoContent from "../../../common/NoContent";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import Course from "./Course";
import Loading from "../../../common/Loading";
import DialogAddCourse from "./DialogAddCourse";
import HasRequiredAuthority from "../../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../../constants";

export default function CoursesTabBody({ id, setTotalCourses }) {
    const [courses, setCourses] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [dialogAddCourse, setDialogAddCourse] = useState({
        visible: false,
        enrollment_id: id,
    });

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

    const closeDialogAddCourse = useCallback(() => {
        setDialogAddCourse((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="flex flex-column gap-3">
            <TabHeader
                title="Enrollment Courses"
                highlights={[`Total - ${courses?.length} Courses`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
                        <Tag
                            icon="pi pi-plus"
                            value="Add Course"
                            onClick={() =>
                                setDialogAddCourse((prev) => ({
                                    ...prev,
                                    visible: true,
                                    closeDialog: closeDialogAddCourse,
                                }))
                            }
                        ></Tag>
                    </HasRequiredAuthority>,
                ]}
            />

            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : courses?.length ? (
                courses.map((course) => <Course key={course?.id} {...course} setCourses={setCourses} />)
            ) : (
                <NoContent error="No Courses Assigned" />
            )}

            <DialogAddCourse enrolledCourses={courses} setCourses={setCourses} {...dialogAddCourse} />
        </div>
    );
}
