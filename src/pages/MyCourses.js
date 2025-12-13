import { useEffect, useState } from "react";
import OrderManager from "../components/common/OrderManager";
import PageTitle from "../components/common/PageTitle";
import { useAppContext } from "../providers/ProviderAppContainer";
import Course from "../components/my_courses/Course";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
    const { requestAPI } = useAppContext();

    const loggedInUser = useSelector((state) => state.stateUser);

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [courses, setCourses] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${loggedInUser?.id}/courses`,
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
    }, [loggedInUser?.id, requestAPI]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <PageTitle title={`My Enrolled Courses`} />

            <OrderManager
                error={error}
                lodaing={loading}
                items={courses}
                entity={"Courses"}
                itemTemplate={(item) => <Course setCourses={setCourses} {...item} />}
            />

            {!courses?.length && (
                <Button
                    className="mx-4"
                    label="Checkout Our Courses Catelogue"
                    severity="warning"
                    onClick={() => {
                        navigate("/course-categories");
                    }}
                />
            )}
        </div>
    );
}
