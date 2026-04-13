import { Divider } from "primereact/divider";
import { ProgressBar } from "primereact/progressbar";
import { TEXT_NORMAL, TEXT_SMALL } from "../../style";


export default function ResultSummary({ suggestion,suitable_stream,analysis }) {
 

    return (
        <div className="flex flex-column gap-2">
                <div className="surface-100 border-1 surface-border border-round p-3">
                    {!!suitable_stream && (
                        <div>
                            <div className={`font-semibold text-primary mb-2 ${TEXT_SMALL}`}>Most suitable for you</div>
                            <p className={`m-0 font-semibold text-primary ${TEXT_NORMAL}`}>{suitable_stream}</p>
                        </div>
                    )}
                    {!!suggestion && (
                        <div className={`${suitable_stream ? "mt-3 pt-2 border-top-1 surface-border" : ""}`}>
                            <div className={`font-semibold text-color-secondary mb-2 ${TEXT_SMALL}`}>Recommendation</div>
                            <p className={`m-0 line-height-3 ${TEXT_NORMAL}`}>{suggestion}</p>
                        </div>
                    )}
                </div>

            {analysis?.length && (
                <div>
                    <Divider className="my-2" />
                    <div className={`font-semibold text-color-secondary mb-2 ${TEXT_SMALL}`}>Streams</div>
                    <div className="flex flex-column gap-2">
                        {analysis.map(({stream,score,feedback}) => (
                            <div key={stream} className="surface-card border-1 surface-border border-round p-3">
                                <div className="flex justify-content-between align-items-center gap-2 mb-2">
                                    <span className={`font-semibold ${TEXT_NORMAL}`}>{stream}</span>
                                    <span className={`font-semibold text-primary ${TEXT_SMALL}`}>{score}</span>
                                </div>
                                <ProgressBar value={parseFloat(score)} showValue={false} className="h-1rem border-noround mb-2" />
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
