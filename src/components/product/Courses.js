import { Divider } from "primereact/divider";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";

export default function Courses() {
    const navigate = useNavigate();

    const { productId } = useParams();

    const courseList = [
        {
            id: 22,
            title: "Course 1",
            subjects: [{ title: "s1" }, { title: "s2" }, { title: "s3" }],
        },
        {
            id: 23,
            title: "Course 2",
            subjects: [{ title: "s1" }, { title: "s2" }, { title: "s3" }],
        },
        {
            id: 24,
            title: "Course 3",
            subjects: [{ title: "s1" }, { title: "s2" }, { title: "s3" }],
        },
    ];

    if (courseList?.length > 0) {
        return (
            <Fragment>
                <p>{`Offering ${courseList.length} Courses`}</p>
                {courseList.map((course, index) => (
                    <div key={course.id} onClick={() => navigate(`/products/${productId}/courses/${course.id}`)}>
                        {index === 0 && <Divider className="p-0 m-0" />}
                        <p className="p-0 m-0 font-bold text-sm">{course.title}</p>
                        <p className="p-0 m-0  text-xs">{course.subjects.length} Subjects</p>
                        <Divider className="p-0 m-0" />
                    </div>
                ))}
            </Fragment>
        );
    }
    return <NoContent />;
}
