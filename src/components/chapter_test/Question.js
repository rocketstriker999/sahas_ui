import { Divider } from "primereact/divider";
import RadioButtonInput from "../common/RadioButtonInput";
import { useEffect, useState } from "react";

// 1. Ensure all props are destructured here
export default function Question({
    test,
    setTest,
    currentQuestion,
    question,
    choice_one,
    choice_two,
    choice_three,
    choice_four,
    correct_choice,
    loadNextQuestion,
}) {
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isAnswering, setIsAnswering] = useState(false);

    // 2. Reset internal state when the question index changes
    useEffect(() => {
        setSelectedChoice(null);
        setIsAnswering(false);
    }, [currentQuestion]);

    // 3. Create the array inside the render body or useMemo
    const choices = [choice_one, choice_two, choice_three, choice_four];

    const handleChoiceSelection = (e) => {
        if (isAnswering) return;

        const value = e.value;
        setSelectedChoice(value);
        setIsAnswering(true);

        if (value === correct_choice) {
            setTest((prev) => ({
                ...prev,
                correctAnswers: (prev.correctAnswers || 0) + 1,
                questionsAttended: (prev.questionsAttended || 0) + 1,
                score: (prev.score || 0) + 1,
            }));
        } else {
            setTest((prev) => ({
                ...prev,
                questionsAttended: (prev.questionsAttended || 0) + 1,
                incorrectAnswers: (prev.incorrectAnswers || 0) + 1,
                score: (prev.score || 0) + 1,
            }));
        }

        setTimeout(loadNextQuestion, 1000);
    };

    const getChoiceClass = (choice) => {
        if (selectedChoice) {
            if (choice === correct_choice) {
                return "scalein animation-duration-1000 bg-green-500 text-white";
            }
            if (choice === selectedChoice && choice !== correct_choice) {
                return "scalein animation-duration-1000 bg-red-500 text-white";
            }
            return "opacity-50";
        }
    };

    return (
        <div className="fadeinleft animation-duration-1000 min-h-0 flex flex-column" key={currentQuestion}>
            <span className="text-orange-800 px-2 font-semibold">
                {currentQuestion + 1}. {question}
            </span>
            <Divider />
            <div className="flex flex-column gap-2 px-2 flex-1 overflow-scroll">
                {choices.map((choice, index) => (
                    <RadioButtonInput
                        key={choice}
                        className={getChoiceClass(choice)}
                        value={selectedChoice}
                        label={choice}
                        onChange={handleChoiceSelection}
                        disabled={isAnswering}
                    />
                ))}
            </div>
        </div>
    );
}
