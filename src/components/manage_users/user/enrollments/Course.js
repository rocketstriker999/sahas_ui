import { Button } from "primereact/button";
import Detail from "../../../common/Detail";

export default function Course({ course, getReadableDate, getCourseTitle, deleteEnrollmentCourse }) {
    return (
        <div key={course?.id} className="flex align-items-start gap-2 mb-2">
            <Detail
                icon="pi pi-angle-right"
                className="flex-1 mb-2"
                title={`By ${course?.created_by_full_name} at ${getReadableDate({ date: course?.created_on })}`}
                value={getCourseTitle(course?.course_id)}
            />
            <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={() => deleteEnrollmentCourse(course?.id)} />
        </div>
    );
}
