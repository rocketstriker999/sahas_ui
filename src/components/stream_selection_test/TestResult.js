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
import { useSelector } from "react-redux";

export default function TestResult() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const { streamSelectionTestResult, setStreamSelectionTestResult } = useOutletContext();
    const navigate = useNavigate();

    const loggedInUser = useSelector((state) => state.stateUser);

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
                    <Button severity="info" className="w-full" label="About This Test" icon="pi pi-info-circle" onClick={() => navigate("../about-test")} />
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
