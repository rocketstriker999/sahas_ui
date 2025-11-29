import { useOutletContext, useParams } from "react-router-dom";

import { Divider } from "primereact/divider";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import OrderManager from "../common/OrderManager";
import Course from "./Course";

import CoursesHeader from "./CoursesHeader";

export default function Courses() {
    const { categoryId } = useParams();

    const { categories } = useOutletContext();

    const category = useMemo(() => categories?.find(({ id }) => id == categoryId), [categories, categoryId]);

    const { requestAPI } = useAppContext();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [courses, setCourses] = useState();

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

            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : (
                <OrderManager
                    updatingViewIndex={updatingViewIndex}
                    items={courses}
                    setItems={setCourses}
                    emptyItemsError="No Courses Found"
                    itemTemplate={(item) => <Course setCourses={setCourses} {...item} updatingViewIndex={updatingViewIndex} />}
                />
            )}
        </div>
    );
}
