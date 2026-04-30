import { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";

import { Outlet } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import { useSelector } from "react-redux";

export default function StreamSelectionTest() {
    const { requestAPI, showToast } = useAppContext();
    const [streamSelectionTestResult, setStreamSelectionTestResult] = useState();
    const [loading, setLoading] = useState();

    const loggedInUser = useSelector((state) => state.stateUser);

    console.log(loggedInUser);

    useEffect(() => {
        if (!!loggedInUser)
            requestAPI({
                requestPath: `users/stream-selection-test-results/latest`,
                requestMethod: "GET",
                requestHeaders: {
                    guest: loggedInUser?.id,
                },
                setLoading,
                onResponseReceieved: ({ error, ...testResult }, responseCode) => {
                    if (testResult && responseCode === 200) {
                        try {
                            testResult.result = JSON.parse(testResult.result);
                            setStreamSelectionTestResult(testResult);
                        } catch {
                            showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Psychometric Test Result !", life: 2000 });
                        }
                    } 
                },
            });
    }, [loggedInUser]);

    if (loading) {
        return <Loading message={"Fetching Details..."} />;
    }

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Psychometric Test`} />
            <Outlet context={{ streamSelectionTestResult, setStreamSelectionTestResult }} />
        </div>
    );
}
