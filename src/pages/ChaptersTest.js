import { useSelector } from "react-redux";
import PageTitle from "../components/common/PageTitle";
import { useAppContext } from "../providers/ProviderAppContainer";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { Outlet } from "react-router-dom";

export default function ChaptersTest() {
    const loggedInUser = useSelector((state) => state.stateUser);
    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [testCatalogue, setTestCatalogue] = useState();
    const [testSelection, setTestSelection] = useState();
    const [testResult, setTestResult] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${loggedInUser?.id}/chapters-test-catalogue`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (testCatalogue, responseCode) => {
                if (testCatalogue && responseCode === 200) {
                    setTestCatalogue(testCatalogue);
                } else {
                    setError("Couldn't load Test Catalogue");
                }
            },
        });
    }, [loggedInUser?.id, requestAPI]);

    return (
        <div className="flex flex-column gap-2 h-full overflow-hidden">
            <PageTitle title={`Self Test`} />

            {loading ? (
                <Loading message={"Loading Test Catelogue"} />
            ) : error ? (
                <NoContent error={"Failed To Load Test Catelogue"} />
            ) : (
                <Outlet context={{ testCatalogue, testSelection, setTestSelection, testResult, setTestResult }} />
            )}
        </div>
    );
}
