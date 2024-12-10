import { Divider } from "primereact/divider";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Courses() {
    const navigate = useNavigate();

    const { productId } = useParams();
    console.log(productId);

    const courseList = [
        {
            id: 22,
            title: "Course 1",
            subjects: [
                { title: "s1", chapters: ["CHAP-1", "CHAP-2", "CHAP-3"] },
                { title: "s2", chapters: ["CHAP-11", "CHAP-22", "CHAP-33"] },
                { title: "s3", chapters: ["CHAP-14", "CHAP-23", "CHAP-31"] },
            ],
        },
        {
            id: 23,
            title: "Course 2",
            subjects: [
                { title: "s1", chapters: ["CHAP-1", "CHAP-2", "CHAP-3"] },
                { title: "s2", chapters: ["CHAP-11", "CHAP-22", "CHAP-33"] },
                { title: "s3", chapters: ["CHAP-14", "CHAP-23", "CHAP-31"] },
            ],
        },
        {
            id: 24,
            title: "Course 3",
            subjects: [
                { title: "s1", chapters: ["CHAP-1", "CHAP-2", "CHAP-3"] },
                { title: "s2", chapters: ["CHAP-11", "CHAP-22", "CHAP-33"] },
                { title: "s3", chapters: ["CHAP-14", "CHAP-23", "CHAP-31"] },
            ],
        },
    ];

    if (courseList?.length > 0) {
        return (
            <Fragment>
                <p>{`Offering ${courseList.length} Courses`}</p>
                {courseList.map((course, index) => (
                    <div key={course.id} onClick={() => navigate(`/products/course/${course.id}`)}>
                        {index === 0 && <Divider className="p-0 m-0" />}
                        <p className="p-0 m-0 font-bold text-sm">{course.title}</p>
                        <p className="p-0 m-0  text-xs">{course.subjects.length} Subjects</p>
                        <Divider className="p-0 m-0" />
                    </div>
                ))}
            </Fragment>
        );
    }
    return <p>No Content Found</p>;
}
