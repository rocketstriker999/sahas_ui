import { Divider } from "primereact/divider";
import { ProgressBar } from "primereact/progressbar";
import { TEXT_NORMAL, TEXT_SMALL } from "../../style";


export default function ResultSummary({ suggestion,analysis }) {
 

    return (
        <div className="flex flex-column gap-2">
            {!!suggestion && (
                <div className="surface-100 border-1 surface-border border-round p-3">
                    <div className={`font-semibold text-color-secondary mb-2 ${TEXT_SMALL}`}>Recommendation</div>
                    <p className={`m-0 line-height-3 ${TEXT_NORMAL}`}>{suggestion}</p>
                </div>
            )}

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
                                {feedback && <p className={`m-0 text-color-secondary line-height-3 ${TEXT_SMALL}`}>{feedback}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
