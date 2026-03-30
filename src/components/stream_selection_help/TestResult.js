import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Summary from "../common/Summary";
import { Panel } from "primereact/panel";
import { getReadableDate } from "../../utils";

export default function TestResult() {
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
        <Panel className="m-2" header={` Conducted At - ${getReadableDate({ date: streamSelectionTestResult?.created_at })}`}>
            <Summary icon={"pi pi-search"} title={"Result"} values={[streamSelectionTestResult?.result]} />
            <Summary
                icon={"pi pi-pen-to-square"}
                title={"Q&A"}
                values={streamSelectionTestResult?.answers?.map(({ question, answer }) => `${question} -> ${answer}`)}
            />
        </Panel>
    ) : (
        <NoContent error="Failed To Load Stream Selection Result" />
    );
}
