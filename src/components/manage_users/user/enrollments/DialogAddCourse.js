import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import TabHeader from "../../../common/TabHeader";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { useOutletContext } from "react-router-dom";
import { TEXT_SIZE_SMALL, TEXT_SIZE_NORMAL, TITLE_TEXT } from "../../../../style";

export default function DialogAddCourse({ visible, enrollment_id, enrolledCourses, setCourses, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();
    const { courses } = useOutletContext();

    const [courseId, setCourseId] = useState();
    const [loading, setLoading] = useState();

    const addInquiry = useCallback(() => {
        requestAPI({
            requestPath: `enrollment-courses`,
            requestMethod: "POST",
            requestPostBody: { course_id: courseId, enrollment_id },
            setLoading: setLoading,
            onResponseReceieved: (course, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Course Added", life: 1000 });
                    setCourses((prev) => [course, ...prev]);
                    setCourseId(); //reset this form
                    closeDialog(); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Course !", life: 2000 });
                }
            },
        });
    }, [closeDialog, courseId, enrollment_id, requestAPI, setCourses, showToast]);

    console.log(courses);

    return (
        <Dialog
            header={`Add New Course`}
            visible={visible}
            className="w-11"
            onHide={closeDialog}
            pt={{
                headertitle: { className: TITLE_TEXT },
                content: { className: "overflow-visible" },
            }}
        >
            <TabHeader
                className="pt-3"
                title="Add New Course To Enrollment"
                highlights={["Course Will be Added Immidiatly", "Course Will Get Expiry From Enrollment"]}
            />

            <FloatLabel className="mt-5">
                <Dropdown
                    value={courses?.find((course) => courseId === course?.id)}
                    inputId="courses"
                    options={courses?.filter(({ id, is_bundle }) => !is_bundle && !enrolledCourses?.find(({ course_id }) => course_id == id))}
                    optionLabel="title"
                    className="w-full"
                    onChange={(e) => setCourseId(e.value?.id)}
                    disabled={loading}
                    pt={{
                        input: { className: TEXT_SIZE_NORMAL },
                        item: { className: TEXT_SIZE_NORMAL },
                    }}
                />
                <label htmlFor="courses" className={`${TEXT_SIZE_SMALL}`}>
                    Courses
                </label>
            </FloatLabel>

            <Button
                className="mt-3"
                label="Add Course"
                severity="warning"
                loading={loading}
                onClick={addInquiry}
                pt={{
                    label: { className: TEXT_SIZE_NORMAL },
                    icon: { className: TEXT_SIZE_NORMAL },
                }}
            />
        </Dialog>
    );
}
