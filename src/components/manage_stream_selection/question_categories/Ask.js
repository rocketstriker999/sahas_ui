import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import Detail from "../../common/Detail";

export default function Ask({
    currentQuestionIndex,
    category,
    total,
    question,
    media_url,
    answer,
    setQuestions,
    options,
    canMoveToNext,
    canMoveToPrevious,
    askPrevious,
    askNext,
}) {
    return (
        <div>
            <div className="flex justify-content-between align-items-center px-2">
                <Button disabled={!canMoveToPrevious} onClick={askPrevious} size="small" text label="<< Previous" />
                <span>
                    {currentQuestionIndex + 1}/{total}
                </span>
                <Button disabled={!canMoveToNext} onClick={askNext} size="small" text label="Next >>" severity="warning" />
            </div>
            <div className="flex flex-column gap-3 px-3 md:px-4 mt-3">
                <div className="surface-card border-1 surface-border border-round-xl p-3 md:p-4 shadow-1">
                    <div className="flex align-items-center justify-content-between mb-3 pb-2 border-bottom-1 surface-border">
                        <div className="flex align-items-center gap-2 min-w-0">
                            <span className="pi pi-bookmark text-primary"></span>
                            <span className="font-semibold text-primary white-space-nowrap text-overflow-ellipsis overflow-hidden">{category}</span>
                        </div>
                        <span className="text-xs text-color-secondary">Question</span>
                    </div>

                    <div className="flex flex-column md:flex-row align-items-start gap-3">
                        {!!media_url && (
                            <img
                                className="w-full md:w-9rem h-auto border-round-lg border-1 surface-border flex-shrink-0 object-cover"
                                src={media_url}
                                alt="question media"
                            />
                        )}
                        <Detail className="flex-1 min-w-0" icon={"pi pi-question-circle"} title={""} value={question} />
                    </div>
                </div>

                <div className="surface-card border-1 surface-border border-round-xl p-2 md:p-3 shadow-1">
                    <div className="flex align-items-center gap-2 px-2 mb-2">
                        <span className="pi pi-list-check text-primary"></span>
                        <span className="font-semibold text-color">Choose one option</span>
                    </div>
                    <ListBox
                    value={answer}
                    onChange={(e) =>
                        setQuestions((prev) => {
                            prev[currentQuestionIndex].answer = e.value;
                            return [...prev];
                        })
                    }
                    options={options}
                    optionLabel="option"
                    className="w-full"
                    listClassName="p-1"
                    pt={{
                        root: { className: "border-none shadow-none bg-transparent" },
                        list: { className: "m-0" },
                        item: { className: "border-round-md px-3 py-3 mb-1 border-1 surface-border" },
                    }}
                />
                </div>
            </div>
        </div>
    );
}
