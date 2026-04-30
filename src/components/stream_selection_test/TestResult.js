import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Summary from "../common/Summary";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import { getRandomBackgroundColor, getReadableDate } from "../../utils";
import ResultSummary from "./ResultSummary";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

export default function TestResult() {
    const { streamSelectionTestResult } = useOutletContext();
    const navigate = useNavigate();
    const { suggestions = [] } = useSelector((state) => state.stateTemplateConfig?.stream_selection || {});


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
                    {!!suggestions?.length &&
                        suggestions.map(({ id, title, pdf }) => (
                            <Button
                                key={id}
                                label={title}
                                className={`w-full border-none ${getRandomBackgroundColor()}`}
                                onClick={() => window.open(pdf, "_blank", "noopener,noreferrer")}
                            />
                        ))}
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
