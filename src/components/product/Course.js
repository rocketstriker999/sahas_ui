import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";

export default function Course() {
    const navigate = useNavigate();

    const subjects = [
        {
            id: 1,
            title: "s34",
            demo_content_id: 234,
            chapters: [
                { title: "chap1", content_id: 12 },
                { title: "chap2", content_id: 13 },
            ],
            content_id: 14,
        },
        {
            id: 2,
            title: "s376",
            chapters: [
                { title: "chap22", content_id: 45 },
                { title: "chap343", content_id: 67 },
            ],
            content_id: 14,
        },
        {
            id: 2,
            title: "s134",
            chapters: [
                { title: "chap2345", content_id: 43 },
                { title: "chap567", content_id: 6767 },
            ],
        },
    ];

    if (subjects?.length > 0) {
        return (
            <Fragment>
                <p onClick={() => navigate(-1)}>back Button</p>
                <TabView pt={{ panelContainer: classNames("m-0 p-0") }}>
                    {subjects.map((subject) => (
                        <TabPanel key={subject.id} header={subject.title}>
                            <div className="p-4" onClick={() => navigate(`/content-player/${subject.demo_content_id}`)}>
                                Demo - need to decide if show/no show
                            </div>
                            <Divider className="m-0 p-0" />
                            {subject.chapters.map((chapter, index) => (
                                <div key={chapter.content_id} onClick={() => navigate(`/content-player/${chapter.content_id}`)}>
                                    <span>{chapter.title}</span>
                                    <Divider className="m-0 p-0" />
                                </div>
                            ))}
                        </TabPanel>
                    ))}
                </TabView>
            </Fragment>
        );
    }
    return <NoContent />;
}
