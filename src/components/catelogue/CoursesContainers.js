import { useOutletContext, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import OrderManager from "../common/OrderManager";

import CoursesContainersHeader from "./CoursesContainersHeader";

import CoursesContainer from "./CoursesContainer";
import DialogEditCoursesContainer from "./DialogEditCoursesContainer";
import DialogAddCourse from "./DialogAddCourse";

export default function CoursesContainers() {
    const { categoryId } = useParams();

    const { categories } = useOutletContext();

    // eslint-disable-next-line eqeqeq
    const category = useMemo(() => categories?.find(({ id }) => id == categoryId), [categories, categoryId]);

    const { requestAPI } = useAppContext();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [coursesContainers, setCoursesContainers] = useState();

    const [dialogEditCoursesContainer, setDialogEditCoursesContainer] = useState({
        visible: false,
    });

    const closeDialogEditCoursesContainer = useCallback(() => {
        setDialogEditCoursesContainer((prev) => ({ ...prev, visible: false }));
    }, []);

    const [dialogAddCourse, setDialogAddCourse] = useState({
        visible: false,
    });

    const closeDialogAddCourse = useCallback(() => {
        setDialogAddCourse((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: `course-categories/${categoryId}/courses-containers`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (coursesContainers, responseCode) => {
                if (coursesContainers && responseCode === 200) {
                    setCoursesContainers(coursesContainers);
                } else {
                    setError("Couldn't load Courses");
                }
            },
        });
    }, [categoryId, requestAPI]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <CoursesContainersHeader
                updatingViewIndex={updatingViewIndex}
                setUpdatingViewIndex={setUpdatingViewIndex}
                coursesContainers={coursesContainers}
                setCoursesContainers={setCoursesContainers}
                category={category}
            />

            <Divider />

            <OrderManager
                error={error}
                lodaing={loading}
                updatingViewIndex={updatingViewIndex}
                items={coursesContainers}
                setItems={setCoursesContainers}
                entity={"Courses"}
                itemTemplate={(item) => (
                    <CoursesContainer
                        setDialogEditCoursesContainer={setDialogEditCoursesContainer}
                        setDialogAddCourse={setDialogAddCourse}
                        setCoursesContainers={setCoursesContainers}
                        {...item}
                        updatingViewIndex={updatingViewIndex}
                    />
                )}
            />

            {!!dialogEditCoursesContainer?.visible && (
                <DialogEditCoursesContainer
                    closeDialog={closeDialogEditCoursesContainer}
                    setCoursesContainers={setCoursesContainers}
                    {...dialogEditCoursesContainer}
                />
            )}

            {!!dialogAddCourse?.visible && (
                <DialogAddCourse closeDialog={closeDialogAddCourse} setCoursesContainers={setCoursesContainers} {...dialogAddCourse} />
            )}
        </div>
    );
}
