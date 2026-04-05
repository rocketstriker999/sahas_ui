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
            <div className="flex flex-column gap-2 px-4 mt-3 ">
                <div className="border-1 border-gray-300 border-round p-2 flex align-items-start gap-2">
                    {!!media_url && <img className="w-6rem" src={media_url} alt="media_url" />}
                    <Detail className="flex-1" icon={"pi pi-question-circle"} title={category} value={question} />
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
                    className="w-full md:w-14rem"
                />
            </div>
        </div>
    );
}
