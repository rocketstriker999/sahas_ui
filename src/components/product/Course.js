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
            // <Fragment>
            //     <p onClick={() => navigate(-1)}>back Button</p>
            //     <TabView pt={{ panelContainer: classNames("m-0 p-0") }}>
            //         {subjects.map((subject) => (
            //             <TabPanel key={subject.id} header={subject.title}>
            //                 <div className="p-4" onClick={() => navigate(`/content-player/${subject.demo_content_id}`)}>
            //                     Demo - need to decide if show/no show
            //                 </div>
            //                 <Divider className="m-0 p-0" />
            //                 {subject.chapters.map((chapter, index) => (
            //                     <div key={chapter.content_id} onClick={() => navigate(`/content-player/${chapter.content_id}`)}>
            //                         <span>{chapter.title}</span>
            //                         <Divider className="m-0 p-0" />
            //                     </div>
            //                 ))}
            //             </TabPanel>
            //         ))}
            //     </TabView>
            // </Fragment>

            <Fragment>
                <p className="text-sm text-primary font-bold mx-3" onClick={() => navigate(-1)}>
                    <i className="pi pi-arrow-left text-sm  mr-2"></i>Back
                </p>
                <TabView className="surface-card border-round shadow-2">
                    {subjects.map((subject) => (
                        <TabPanel key={subject.id} header={subject.title}>
                            {/* Demo Section */}
                            <div
                                className="p-3 border-round surface-card shadow-1 mb-3 cursor-pointer flex align-items-center justify-content-between"
                                onClick={() => navigate(`/content-player/${subject.demo_content_id}`)}
                            >
                                <span className="font-bold text-sm">Demo Content</span>
                                <i className="pi pi-play text-primary"></i>
                            </div>

                            {/* Chapters Section */}
                            {subject.chapters.map((chapter, index) => (
                                <div
                                    key={chapter.content_id}
                                    className="p-3 border-round surface-card shadow-1 mb-2 cursor-pointer flex align-items-center justify-content-between"
                                    onClick={() => navigate(`/content-player/${chapter.content_id}`)}
                                >
                                    <span className="text-sm">{chapter.title}</span>
                                    <i className="pi pi-angle-right text-primary"></i>
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
