import { useCallback, useEffect, useState } from "react";
import RadioButtonInput from "../common/RadioButtonInput";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";

export default function Question({
    question,
    choice_one,
    choice_two,
    choice_three,
    choice_four,
    correct_choice,
    loadNextQuesiton,
    canLoadNextQuestion,
    increaseScore,
    currentQuestion,
    setQuizSubmitted,
}) {
    const [selectedChoice, setSelectedChoice] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedChoice();
    }, [question]);

    const onChange = useCallback(
        (e) => {
            setSelectedChoice(() => ({
                value: e.value,
                isCorrect: e.value === correct_choice,
            }));
        },
        [correct_choice],
    );

    const verifyQuestion = useCallback(() => {
        if (selectedChoice?.isCorrect) {
            increaseScore();
        }
        setTimeout(() => {
            if (canLoadNextQuestion) loadNextQuesiton();
            else setQuizSubmitted(true);
        }, [1500]);
    }, [canLoadNextQuestion, increaseScore, loadNextQuesiton, selectedChoice, setQuizSubmitted]);

    const getBackgroundForChoice = useCallback(
        (choice) => {
            if (selectedChoice?.locked) {
                if (choice === selectedChoice?.value)
                    return `scalein animation-duration-500 animation-iteration-2 ${selectedChoice?.isCorrect ? "bg-green-300" : "bg-red-300"}`;
                return "display-none";
            }
        },
        [selectedChoice],
    );

    return (
        <div>
            <div className="fadeinleft animation-duration-1000 animation-iteration-1" key={currentQuestion}>
                <p className=" text-orange-800 px-2 text-xl font-semibold">
                    {currentQuestion + 1}. {question}
                </p>
                <Divider />
                <div className="flex flex-column gap-2 px-2">
                    <RadioButtonInput className={getBackgroundForChoice(choice_one)} value={selectedChoice?.value} label={choice_one} onChange={onChange} />
                    <RadioButtonInput className={getBackgroundForChoice(choice_two)} value={selectedChoice?.value} label={choice_two} onChange={onChange} />
                    <RadioButtonInput className={getBackgroundForChoice(choice_three)} value={selectedChoice?.value} label={choice_three} onChange={onChange} />
                    <RadioButtonInput className={getBackgroundForChoice(choice_four)} value={selectedChoice?.value} label={choice_four} onChange={onChange} />
                </div>
            </div>
            <Divider />

            <div className="flex align-items-center justify-content-between px-2">
                <Button label="Cancel" severity="danger" text icon="pi pi-times" iconPos="left" onClick={() => navigate(-1)} />
                {canLoadNextQuestion ? (
                    <Button
                        label="Next"
                        severity="success"
                        text
                        icon="pi pi-arrow-right"
                        iconPos="right"
                        onClick={() => {
                            setSelectedChoice((prev) => ({ ...prev, locked: true }));
                            verifyQuestion();
                        }}
                    />
                ) : (
                    <Button
                        label="Submit"
                        icon="pi pi-check"
                        iconPos="right"
                        onClick={() => {
                            setSelectedChoice((prev) => ({ ...prev, locked: true }));
                            verifyQuestion();
                        }}
                    />
                )}
            </div>
        </div>
    );
}
