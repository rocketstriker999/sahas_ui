import { Outlet } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";

export default function Catelogue() {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    useEffect(() => {
        requestAPI({
            requestPath: `course-categories`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,

            onResponseReceieved: (categories, responseCode) => {
                if (categories && responseCode === 200) {
                    setCategories(categories);
                } else {
                    setError("Couldn't load Product Categories");
                }
            },
        });
    }, [requestAPI]);

    return (
        <div className="flex flex-column h-full ">
            <PageTitle title={"Enroll"} />

            {loading ? <Loading message="Loading Categories" /> : error ? <NoContent error={error} /> : <Outlet context={{ categories, setCategories }} />}
        </div>
    );
}
