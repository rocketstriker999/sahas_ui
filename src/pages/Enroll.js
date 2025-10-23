import { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import ButtonPay from "../components/enroll/ButtonPay";

export default function Enroll() {
    const [course, setCourse] = useState();
    const { courseId } = useParams();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (courseId)
            requestAPI({
                requestPath: `courses/${courseId}/payment-gateway-payload`,
                requestMethod: "GET",
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (course, responseCode) => {
                    if (course && responseCode === 200) {
                        setCourse(course);
                    } else {
                        setError("Couldn't load Course");
                    }
                },
            });
    }, [courseId, requestAPI]);

    return loading ? (
        <Loading message="Loading Course" />
    ) : error ? (
        <NoContent error={error} />
    ) : course ? (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Enroll - ${course?.title}`} />
            <img className="w-full" src={course?.image} alt={course?.image} />

            <ButtonPay />
        </div>
    ) : (
        <NoContent error={"Unable To Enroll This Course"} />
    );
}
