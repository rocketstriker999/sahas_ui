import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Summary from "../common/Summary";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import { getReadableDate } from "../../utils";
import ResultSummary from "./ResultSummary";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "primereact/button";

export default function TestResult() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const { streamSelectionTestResult, setStreamSelectionTestResult } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: `users/stream-selection-test-results/latest`,
            requestMethod: "GET",
            setLoading,
            onResponseReceieved: ({ error, ...testResult }, responseCode) => {
                if (testResult && responseCode === 200) {
                    try {
                        testResult.result = JSON.parse(testResult.result);
                        setStreamSelectionTestResult(testResult);
                    } catch {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Psychometric Test Result !", life: 2000 });
                    }
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Load Psychometric Test Result !", life: 2000 });
                }
            },
        });
    }, [requestAPI, setStreamSelectionTestResult, showToast]);

    if (loading) {
        return <Loading message={"Fetching Result"} />;
    }

    return streamSelectionTestResult?.result ? (
        <div className="flex-1 flex flex-column overflow-y-scroll">
            <Panel className="m-2" header={` Conducted At - ${getReadableDate({ date: streamSelectionTestResult?.created_at })}`}>
                <ResultSummary {...streamSelectionTestResult.result} />
                <div className="mt-2 flex flex-column md:flex-row gap-2">
                    <Button
                        outlined
                        severity="warning"
                        className="w-full"
                        label="Stream Specific Analysis"
                        icon="pi pi-chart-line"
                        onClick={() => navigate("../analysis")}
                    />
                    <Button severity="info" className="w-full" label="PRO TIPS (Must Read)" icon="pi pi-lightbulb" onClick={() => navigate("../tips")} />
                </div>
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
