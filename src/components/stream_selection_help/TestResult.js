import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Summary from "../common/Summary";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import { getReadableDate } from "../../utils";
import ResultSummary from "./ResultSummary";

export default function TestResult() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [streamSelectionTestResult, setStreamSelectionTestResult] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/stream-selection-test-results/latest`,
            requestMethod: "GET",
            setLoading,
            onResponseReceieved: (payload, responseCode) => {
                const { error, ...rest } = payload || {};
                if (rest && responseCode === 200) {
                    const next = { ...rest };
                    if (typeof next.result === "string") {
                        try {
                            next.result = JSON.parse(next.result);
                        } catch {
                            /* keep string for ResultSummary */
                        }
                    }
                    setStreamSelectionTestResult(next);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Load Psychometric Test Questions !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

    if (loading) {
        return <Loading message={"Fetching Result"} />;
    }

    return streamSelectionTestResult?.result ? (
        <div className="flex-1 flex flex-column overflow-y-scroll">
            <Panel className="m-2" header={` Conducted At - ${getReadableDate({ date: streamSelectionTestResult?.created_at })}`}>
                <ResultSummary {...streamSelectionTestResult.result} />
                <Divider className="my-3" />
                <Summary
                    icon={"pi pi-pen-to-square"}
                    title={"Q&A"}
                    values={streamSelectionTestResult?.answers?.map(({ question, answer }) => `${question} -> ${answer}`)}
                />
            </Panel>
        </div>
    ) : (
        <NoContent error="Failed To Load Psychometric Test Result" />
    );
}
