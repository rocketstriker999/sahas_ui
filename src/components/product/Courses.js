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
            // <Fragment>
            //     <p className="text-base font-bold px-3">{`Offering ${courseList.length} Courses`}</p>
            //     {courseList.map((course, index) => (
            //         <div key={course.id} onClick={() => navigate(`/products/course/${course.id}`)} className="mx-3" >
            //             {index === 0 && <Divider className="p-0 m-0 mb-3" />}
            //             <p className="text-sm font-bold m-1 mb-2">{course.title}</p>
            //             <div className="flex align-items-center m-1">
            //                 <i className="pi pi-book mr-1 text-primary text-sm"></i>
            //                 <span className="text-sm">{course.subjects.length} Subjects</span>
            //             </div>
            //             <Divider className="p-0 m-0 mt-3" />
            //         </div>
            //     ))}
            // </Fragment>

            <Fragment>
                <p className="text-base font-bold px-3">{`Offering ${courseList.length} Courses`}</p>
                {courseList.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/products/course/${course.id}`)}
                        className="p-3 border-round surface-card shadow-3 mb-3 mx-3 flex align-items-center justify-content-between"
                    >
                        <div className="flex flex-column">
                            <p className="text-sm font-bold m-0 mb-2">{course.title}</p>
                            <div className="flex align-items-center">
                                <i className="pi pi-book mr-2 text-primary text-sm"></i>
                                <span className="text-sm">{course.subjects.length} Subjects</span>
                            </div>
                        </div>
                        <i className="pi pi-angle-right text-primary"></i>
                    </div>
                ))}
            </Fragment>


        );
    }
    return <NoContent />;
}
