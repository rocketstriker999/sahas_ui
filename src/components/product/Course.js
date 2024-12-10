import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Course() {
    const { courseId } = useParams();

    const navigate = useNavigate();

    const subjects = [
        { id: 1, title: "s1", chapters: ["CHAP-1", "CHAP-2", "CHAP-3"] },
        { id: 2, title: "s2", chapters: ["CHAP-11", "CHAP-22", "CHAP-33"] },
        { id: 3, title: "s3", chapters: ["CHAP-14", "CHAP-23", "CHAP-31"] },
    ];

    if (subjects?.length > 0) {
        return (
            <Fragment>
                <p onClick={() => navigate(-1)}>back Button</p>
                <TabView pt={{ panelContainer: classNames("m-0 p-0") }}>
                    {subjects.map((subject) => (
                        <TabPanel key={subject.id} header={subject.title}>
                            {subject.chapters.map((chapter, index) => (
                                <div>
                                    <span>{chapter}</span>
                                    <Divider className="m-0 p-0" />
                                </div>
                            ))}
                        </TabPanel>
                    ))}
                </TabView>
            </Fragment>
        );
    }
    return <p>No Content Found</p>;
}
