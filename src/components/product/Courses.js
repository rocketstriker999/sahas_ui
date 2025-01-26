import { Fragment } from "react";
import NoContent from "../common/NoContent";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Courses() {
    const navigate = useNavigate();
    const catelogue = useSelector((state) => state.stateCatelogue.catelogue);
    const { productId } = useParams();

    const courses = catelogue?.courses.filter((course) => course.product_id == productId);

    return courses?.length > 0 ? (
        <Fragment>
            <div className="flex justify-content-between align-items-center px-3 text-sm font-bold text-primary">
                <p onClick={() => navigate(-1)}>
                    <i className="pi pi-arrow-left mr-1 text-xs"></i> Back
                </p>
                <p>{`( ${courses?.length} Courses )`}</p>
            </div>
            {courses.map((course, index) => (
                <div
                    key={course.id}
                    onClick={() => navigate(`courses/${course.id}`)}
                    className="p-3 border-round shadow-3 mb-3 mx-3 flex align-items-center justify-content-between"
                >
                    <div className="flex flex-column">
                        <p className="text-sm font-bold m-0 mb-2">
                            {index + 1}. {course.title}
                        </p>
                        <div className="flex align-items-center  ">
                            <i className="pi pi-book mr-1 text-primary"></i>
                            <span className="text-xs text-gray-800">{course.subjects_count} Subjects</span>
                        </div>
                    </div>
                    <i className="pi pi-angle-right text-primary"></i>
                </div>
            ))}
        </Fragment>
    ) : (
        <NoContent error="No Courses Found" />
    );
}
