import { ProgressBar } from "primereact/progressbar";
import { TEXT_NORMAL, TEXT_SMALL } from "../../style";
import { useOutletContext } from "react-router-dom";
import NoContent from "../common/NoContent";

export default function Analysis() {
    const { streamSelectionTestResult } = useOutletContext();
    const analysis = streamSelectionTestResult?.result?.analysis;

    if (!analysis?.length) {
        return <NoContent error="No Stream Specific Analysis Found" />;
    }

    return (
        <div className="flex-1 flex flex-column overflow-y-scroll p-3 md:p-4">
            <div className="flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div>
                    <div className={`font-semibold text-900 ${TEXT_NORMAL}`}>Stream Specific Analysis</div>
                    <div className={`text-color-secondary ${TEXT_SMALL}`}>Your strengths and fit across each stream</div>
                </div>
                <span className={`inline-flex align-items-center px-2 py-1 border-round bg-primary-50 text-primary font-medium ${TEXT_SMALL}`}>
                    {analysis.length} Streams
                </span>
            </div>

            <div className="flex flex-column gap-3">
                {analysis.map(({ stream, score, feedback }) => {
                    const numericScore = parseFloat(score) || 0;
                    return (
                        <div key={stream} className="surface-ground border-1 surface-border border-round-lg p-3">
                            <div className="flex justify-content-between align-items-center gap-2 mb-2">
                                <span className={`font-semibold text-900 ${TEXT_NORMAL}`}>{stream}</span>
                                <span className={`font-semibold text-primary border-1 border-primary-200 bg-primary-50 px-2 py-1 border-round ${TEXT_SMALL}`}>
                                    {numericScore}%
                                </span>
                            </div>

                            <ProgressBar value={numericScore} showValue={false} className="h-1rem border-round mb-2" />

                            {Array.isArray(feedback) && feedback.length > 0 && (
                                <ul className={`m-0 pl-3 text-color-secondary line-height-3 ${TEXT_SMALL}`}>
                                    {feedback.map((point, index) => (
                                        <li key={`${stream}-feedback-${index}`}>{point}</li>
                                    ))}
                                </ul>
                            )}
                            {typeof feedback === "string" && !!feedback && (
                                <p className={`m-0 text-color-secondary line-height-3 ${TEXT_SMALL}`}>{feedback}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
