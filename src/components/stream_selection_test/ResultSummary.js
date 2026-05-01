import { TEXT_NORMAL, TEXT_SMALL } from "../../style";
import { Chart } from 'primereact/chart';

export default function ResultSummary({ suggestion, suitable_stream, analysis }) {
    return (
        <div className="flex flex-column gap-2">
            <div className="bg-indigo-700 border-1 border-indigo-800 border-round p-3">
                {!!suitable_stream && (
                    <div>
                        <div className={`font-semibold text-indigo-100 mb-2 ${TEXT_SMALL}`}>Most Suitable Stream For You</div>
                        <p className={`m-0 font-bold text-white ${TEXT_NORMAL}`}>{suitable_stream?.toUpperCase()}</p>
                    </div>
                )}
                {!!suggestion && (
                    <div className={`${suitable_stream ? "mt-3 pt-2 border-top-1 border-indigo-500" : ""}`}>
                        <div className={`font-semibold text-indigo-100 mb-2 ${TEXT_SMALL}`}>Recommendation</div>
                        <p className={`m-0 line-height-3 text-white ${TEXT_NORMAL}`}>{suggestion}</p>
                    </div>
                )}
            </div>

            {analysis?.length && (
                <div>

                    <Chart type="pie" data={{
                        labels: analysis.map(({ stream }) => stream),
                        datasets: [
                            {
                                data: analysis.map(({ score }) => parseFloat(score)),
                               
                            }
                        ]
                    }} className="w-full md:w-30rem" />

                   
                </div>
            )}
        </div>
    );
}
