import { Fragment } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";

export default function Subjects() {
    const navigate = useNavigate();
    const product = useOutletContext();
    const { courseId } = useParams();

    const course = courseId && product?.courses?.length && product?.courses.find((course) => course.id == courseId);

    if (course && course.subjects.length > 0)
        return (
            <Fragment>
                <div className="flex justify-content-between align-items-center px-3 text-sm font-bold text-primary">
                    <p onClick={() => navigate(-1)}>
                        <i className="pi pi-arrow-left mr-1 text-xs"></i> Back
                    </p>
                    <p>{`( ${course.subjects.length} Subjects )`}</p>
                </div>
                {course.subjects.map((subject, index) => (
                    <div
                        key={subject.id}
                        onClick={() => navigate(`subjects/${subject.id}`)}
                        className="p-3 border-round shadow-3 mb-3 mx-3 flex align-items-center justify-content-between"
                    >
                        <div className="flex flex-column">
                            <p className="text-sm font-bold m-0 mb-2">
                                {index + 1}. {subject.title}
                            </p>
                            <div className="flex align-items-center">
                                <i className="pi pi-file mr-1 text-primary"></i>
                                <span className="text-xs text-gray-800">{subject?.chapters?.length} Chapters</span>
                            </div>
                        </div>
                        <i className="pi pi-angle-right text-primary"></i>
                    </div>
                ))}
            </Fragment>
        );

    return <NoContent />;
}
