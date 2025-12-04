import { useOutletContext, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import OrderManager from "../common/OrderManager";
import Course from "./Course";

import CoursesHeader from "./CoursesHeader";
import DialogEditCourse from "./DialogEditCourse";

export default function Courses() {
    const { categoryId } = useParams();

    const { categories } = useOutletContext();

    // eslint-disable-next-line eqeqeq
    const category = useMemo(() => categories?.find(({ id }) => id == categoryId), [categories, categoryId]);

    const { requestAPI } = useAppContext();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [courses, setCourses] = useState();

    const [dialogEditCourse, setDialogEditCourse] = useState({
        visible: false,
    });

    const closeDialogEditCourse = useCallback(() => {
        setDialogEditCourse((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: `course-categories/${categoryId}/courses`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (courses, responseCode) => {
                if (courses && responseCode === 200) {
                    setCourses(courses);
                } else {
                    setError("Couldn't load Courses");
                }
            },
        });
    }, [categories, categoryId, requestAPI]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <CoursesHeader
                updatingViewIndex={updatingViewIndex}
                setUpdatingViewIndex={setUpdatingViewIndex}
                courses={courses}
                setCourses={setCourses}
                category={category}
            />

            <Divider />

            <OrderManager
                error={error}
                lodaing={loading}
                updatingViewIndex={updatingViewIndex}
                items={courses}
                setItems={setCourses}
                entity={"Courses"}
                itemTemplate={(item) => (
                    <Course setDialogEditCourse={setDialogEditCourse} setCourses={setCourses} {...item} updatingViewIndex={updatingViewIndex} />
                )}
            />

            {dialogEditCourse?.visible && <DialogEditCourse closeDialog={closeDialogEditCourse} setCourses={setCourses} {...dialogEditCourse} />}
        </div>
    );
}
