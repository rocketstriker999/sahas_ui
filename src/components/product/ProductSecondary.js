import { Fragment, useState } from "react";
import Courses from "./Courses";
import Course from "./Course";

export default function ProductSecondary({ productSecondaryInfo }) {
    const [selectedCourse, setSelectedCourse] = useState(false);

    return (
        <Fragment>
            <div className=" font-semibold	">
                <p className="px-2">{`Offering Courses (${productSecondaryInfo.courses.length})`}</p>
            </div>
            {selectedCourse ? (
                <Course course={selectedCourse} handleCourseSelection={setSelectedCourse} />
            ) : (
                <Courses courseList={productSecondaryInfo.courses} handleCourseSelection={setSelectedCourse} />
            )}
        </Fragment>
    );

    // useEffect(() => {
    //     requestAPI({
    //         requestPath: `products/${courseId}/secondary-details`,
    //         onResponseReceieved: (courseSecondaryDetails, responseCode) => {
    //             if (courseSecondaryDetails && responseCode === 200) {
    //                 setCourseSecondaryDetails(courseSecondaryDetails);
    //             }
    //         },
    //         setLoading: setLoading,
    //         onRequestFailure: setError,
    //     });
    // }, [courseId]);

    // const itemTemplate = (chapters) => {
    //     if (!chapters || chapters.length === 0) return <p>No Data Found</p>;

    //     return chapters.map((chapter, index) => (
    //         <div
    //             key={chapter.name}
    //             className={classNames("flex align-items-center p-3", {
    //                 "border-top-1 surface-border": index !== 0,
    //             })}
    //         >
    //             <div className="flex-1 flex flex-column gap-2">
    //                 <div className="flex align-items-center gap-2">
    //                     <div className="md:text-base text-sm font-bold">{index}.</div>
    //                     <div className="md:text-base text-sm font-bold">{chapter.name}</div>
    //                 </div>
    //                 <div className="md:text-sm text-xs text-muted">{chapter.tagline}</div>
    //             </div>
    //             <span className="pi pi-lock"></span>
    //         </div>
    //     ));
    // };

    // if (courseSecondaryDetails && !loading) {
    //     return (
    //         <>
    //             <h1 className="lg:text-3xl text-lg">{config.title}</h1>

    //             <TabView>
    //                 {courseSecondaryDetails.courses.map((course) => (
    //                     <TabPanel className="md:text-base text-sm" header={course.name}>
    //                         <Accordion multiple activeIndex={0}>
    //                             {course.subjects.map((subject, index) => (
    //                                 <AccordionTab
    //                                     header={
    //                                         <div className="flex justify-content-between align-items-center">
    //                                             <span className="md:text-base text-sm">{subject.name}</span>
    //                                             <span className="md:text-base text-sm font-medium">
    //                                                 {subject.chapters.length}{" "}
    //                                                 Chapters
    //                                             </span>
    //                                         </div>
    //                                     }
    //                                 >
    //                                     <DataView
    //                                         value={subject.chapters}
    //                                         listTemplate={itemTemplate}
    //                                     />
    //                                 </AccordionTab>
    //                             ))}
    //                         </Accordion>
    //                     </TabPanel>
    //                 ))}
    //             </TabView>

    //             {/*  */}
    //         </>
    //     );
    // }

    // if (loading && !courseSecondaryDetails) {
    //     return <p>Loading Learning Config</p>;
    // }

    // if (error) {
    //     return <p>{error}</p>;
    // }
}
