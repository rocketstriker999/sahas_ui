import { useParams } from "react-router-dom";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useEffect, useState } from "react";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import Question from "./Question";
import Timer from "../common/Timer";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

export default function Quiz() {
    const { chapterId } = useParams();

    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [quiz, setQuiz] = useState();

    const [score, setScore] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [quizSubmitted, setQuizSubmitted] = useState();

    useEffect(() => {
        if (chapterId && !quiz)
            requestAPI({
                requestPath: `chapters/${chapterId}/quiz`,
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (quiz, responseCode) => {
                    if (quiz && responseCode === 200) {
                        setQuiz(quiz);
                    }
                },
            });
    }, [chapterId, quiz, requestAPI]);

    const loadNextQuesiton = useCallback(() => {
        setCurrentQuestion((prev) => prev + 1);
    }, []);

    const increaseScore = useCallback(() => {
        setScore((prev) => prev + 1);
    }, []);

    if (loading) {
        return <Loading message={"Fetching Questions"} className={"mt-2"} />;
    }

    if (!quiz?.quiz_pool?.length || error) {
        return <NoContent error={"Unable to Start Quiz"} className={"mt-2"} />;
    }

    if (quizSubmitted) {
        return (
            <div>
                <p>Your Scrore is {score}</p>
                <Button
                    label="Retry"
                    onClick={() => {
                        setScore(0);
                        setCurrentQuestion(0);
                        setQuizSubmitted(false);
                    }}
                />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-column h-full min-h-0">
            <p className="text-xs text-center  p-2 m-0 bg-orange-500 text-white">Do Not Refresh While Taking Self Assesment !</p>
            <div className="flex align-items-center justify-content-center">
                <Timer minutes={quiz.quiz_time} onTimeUp={setQuizSubmitted} />
                <Divider layout="vertical" />
                <div className="flex flex-column gap-2">
                    <span
                        className=" text-center text-xs  bg-green-300 text-white font-bold p-2 border-round border-1 border-green-800 scalein animation-duration-500 animation-iteration-1"
                        key={score}
                    >
                        Score : {score}
                    </span>
                    <span className=" text-center  text-xs bg-blue-300 text-white font-bold  p-2 border-round border-1 border-green-800 scalein animation-duration-500 animation-iteration-1">
                        Question : {currentQuestion + 1}/{quiz?.quiz_pool?.length}
                    </span>
                </div>
            </div>
            <Divider />

            <Question
                currentQuestion={currentQuestion}
                {...quiz?.quiz_pool[currentQuestion]}
                increaseScore={increaseScore}
                loadNextQuesiton={loadNextQuesiton}
                canLoadNextQuestion={currentQuestion < quiz?.quiz_pool?.length - 1}
                setQuizSubmitted={setQuizSubmitted}
            />
        </div>
    );
}
