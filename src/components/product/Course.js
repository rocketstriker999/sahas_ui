import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";
import { requestProxy } from "../../utils";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Course() {
    const navigate = useNavigate();

    const { productId } = useParams();
    const { courseId } = useParams();

    const [course, setCourses] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestProxy({
            requestPath: `/api/products/${productId}/courses/${courseId}`,
            onResponseReceieved: (course, responseCode) => {
                if (course && responseCode === 200) {
                    setCourses(course);
                }
            },
            setLoading: setLoading,
        });
    }, []);

    if (loading) {
        return <ProgressSpinner />;
    }

    if (course) {
        return (
            <Fragment>
                <p onClick={() => navigate(-1)}>back Button</p>
                {course.subjects.length > 0 ? (
                    <TabView pt={{ panelContainer: classNames("m-0 p-0") }}>
                        {course.subjects.map((subject) => (
                            <TabPanel key={subject.id} header={subject.title}>
                                {!course.has_access && (
                                    <div className="p-4">
                                        {subject.demo_content_id ? (
                                            <span onClick={() => navigate(`/content-player/${subject.demo_content_id}`)}>Demo</span>
                                        ) : (
                                            <span>No Demo Availabale</span>
                                        )}
                                    </div>
                                )}

                                <Divider className="m-0 p-0" />
                                {subject.chapters?.length > 0 ? (
                                    subject.chapters?.map((chapter, index) => (
                                        <Fragment>
                                            {index !== 0 && <Divider className="m-0 p-0" />}
                                            <div
                                                className="flex justify-content-between p-2"
                                                key={chapter.name}
                                                onClick={() => {
                                                    if (course.has_access) {
                                                        navigate(`/content-player/${chapter.content_id}`);
                                                    }
                                                }}
                                            >
                                                <span>{chapter.title}</span>
                                                {!course.has_access && <span className="pi pi-lock font-bold" />}
                                            </div>
                                        </Fragment>
                                    ))
                                ) : (
                                    <NoContent />
                                )}
                            </TabPanel>
                        ))}
                    </TabView>
                ) : (
                    <NoContent />
                )}
            </Fragment>
        );
    }
}
