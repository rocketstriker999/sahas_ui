import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";
import { requestProxy } from "../../utils";
import Loading from "../common/Loading";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";

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
        return <Loading />;
    }

    if (course) {
        return (
            <Fragment>
                <p className="text-sm text-primary font-bold mx-3" onClick={() => navigate(-1)}>
                    <i className="pi pi-arrow-left text-sm mr-2"></i> Back
                </p>
                {course.subjects.length > 0 ? (
                    <TabView>
                        {course.subjects
                            .sort((indexA, indexB) => indexB - indexA)
                            .map((subject) => (
                                <TabPanel key={subject.id} header={subject.title}>
                                    {!course.has_access && subject.demo_content_id && (
                                        <Button
                                            className="p-3 w-full border-round bg-primary shadow-3 mb-3 flex align-items-center justify-content-between"
                                            onClick={() => navigate(`/content-player/demo/${subject.demo_content_id}`)}
                                        >
                                            <span className="font-bold text-sm">Demo</span>
                                            <i className="pi pi-play text-white"></i>
                                        </Button>
                                    )}

                                    {subject.chapters?.length > 0 ? (
                                        <BlockUI blocked={!course.has_access} template={<i className="pi pi-lock" style={{ fontSize: "3rem" }}></i>}>
                                            {subject.chapters?.map((chapter, index) => (
                                                <Fragment>
                                                    {index !== 0 && <Divider className="m-0 p-0" />}
                                                    <div
                                                        className="p-3 border-round shadow-3 mb-2 flex align-items-center justify-content-between"
                                                        key={chapter.name}
                                                        onClick={() => {
                                                            navigate(`/content-player/chapter/${chapter.content_id}`);
                                                        }}
                                                    >
                                                        <span className="text-sm">{chapter.title}</span>
                                                        <span className="pi pi-angle-right text-primary" />
                                                    </div>
                                                </Fragment>
                                            ))}
                                        </BlockUI>
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
