import { useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";

export default function StreamSelectionTestResult() {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const [streamSelectionTestResult, setStreamSelectionTestResult] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/stream-selection-test-results/latest`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: ({ error, ...streamSelectionTestResult }, responseCode) => {
                if (streamSelectionTestResult && responseCode === 200) {
                    setStreamSelectionTestResult(streamSelectionTestResult);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Load Stream Selection Questions !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

    if (loading) {
        return <Loading message={"Fetching Result"} />;
    }

    return streamSelectionTestResult?.result ? (
        <span> {streamSelectionTestResult?.result} </span>
    ) : (
        <NoContent error="Failed To Load Stream Selection Result" />
    );
}
