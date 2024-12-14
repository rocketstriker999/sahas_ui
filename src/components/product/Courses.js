import { Divider } from "primereact/divider";
import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";
import { requestAPI } from "../../utils";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Courses() {
    const navigate = useNavigate();

    const { productId } = useParams();

    const [courses, setCourses] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `products/${productId}/courses`,
            onResponseReceieved: (courses, responseCode) => {
                if (courses && responseCode === 200) {
                    setCourses(courses);
                }
            },
            setLoading: setLoading,
        });
    }, []);

    if (loading) {
        return <ProgressSpinner />;
    }

    if (courses && courses.length > 0) {
        console.log(courses);
        return (
            <Fragment>
                <p>{`Offering ${courses.length} Courses`}</p>
                {courses.map((course, index) => (
                    <div key={course.id} onClick={() => navigate(`/products/${productId}/courses/${course.id}`)}>
                        {index === 0 && <Divider className="p-0 m-0" />}
                        <p className="p-0 m-0 font-bold text-sm">{course.title}</p>
                        <p className="p-0 m-0  text-xs">{course.subjects} Subjects</p>
                        <Divider className="p-0 m-0" />
                    </div>
                ))}
            </Fragment>
        );
    }
    return <NoContent />;
}
