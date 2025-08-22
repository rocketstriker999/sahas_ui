import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import TabHeader from "../../../common/TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";

export default function DialogAddCourse({ enrollmentId, setAddingNewCourse, courses, setEnrollments }) {
    const { requestAPI, showToast } = useAppContext();

    const [courseId, setCourseId] = useState();
    const [loading, setLoading] = useState();

    const addInquiry = useCallback(() => {
        requestAPI({
            requestPath: `enrollments/${enrollmentId}/courses`,
            requestMethod: "POST",
            requestPostBody: { course_id: courseId },
            setLoading: setLoading,
            onResponseReceieved: (courses, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Course Added", life: 1000 });
                    setEnrollments((prev) =>
                        prev?.map((enrollment) => {
                            if (enrollment?.id === enrollmentId) {
                                enrollment.courses = courses;
                            }
                            return enrollment;
                        })
                    );
                    setAddingNewCourse(() => false);
                    setCourseId();
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Course !", life: 2000 });
                }
            },
        });
    }, [courseId, enrollmentId, requestAPI, setAddingNewCourse, setEnrollments, showToast]);

    return (
        <Dialog header={`Add New Course`} visible={enrollmentId} className="w-11" onHide={() => setAddingNewCourse(false)}>
            <TabHeader
                className="pt-3"
                title="Add New Course To Enrollment"
                highlights={["Course Will be Added Immidiatly", "Course Will Get Expiry From Enrollment"]}
            />

            <FloatLabel className="mt-5">
                <Dropdown
                    value={courses?.find((course) => courseId === course?.id)}
                    inputId="courses"
                    options={courses}
                    optionLabel="title"
                    className="w-full"
                    onChange={(e) => setCourseId(e.value?.id)}
                    disabled={loading}
                />
                <label htmlFor="courses">Courses</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Course" severity="warning" loading={loading} onClick={addInquiry} />
        </Dialog>
    );
}
