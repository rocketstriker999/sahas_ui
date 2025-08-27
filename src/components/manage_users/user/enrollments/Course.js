import { Button } from "primereact/button";
import Detail from "../../../common/Detail";
import { getReadableDate } from "../../../../utils";
import { useOutletContext } from "react-router-dom";

export default function Course({ course }) {
    const { getCourseTitle } = useOutletContext();

    // const deleteEnrollmentCourse = useCallback(
    //     (courseId) => {
    //         requestAPI({
    //             requestPath: `enrollment-courses/${courseId}`,
    //             requestMethod: "DELETE",
    //             setLoading: setDeleting,
    //             parseResponseBody: false,
    //             onResponseReceieved: (_, responseCode) => {
    //                 if (responseCode === 204) {
    //                     showToast({ severity: "success", summary: "Deleted", detail: "Course Deleted", life: 1000 });
    //                     setEnrollments((prev) => {
    //                         prev[index].courses = prev?.[index]?.courses?.filter((course) => course.id !== courseId);
    //                         return [...prev];
    //                     });
    //                 } else {
    //                     showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Inquiry Note !", life: 2000 });
    //                 }
    //             },
    //         });
    //     },
    //     [index, requestAPI, setEnrollments, showToast]
    // );

    return (
        <div key={course?.id} className="flex align-items-start gap-2 mb-2">
            <Detail
                icon="pi pi-angle-right"
                className="flex-1 mb-2"
                title={`By ${course?.created_by_full_name} at ${getReadableDate({ date: course?.created_on })}`}
                value={getCourseTitle(course?.course_id)}
            />
            <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" />
        </div>
    );
}
