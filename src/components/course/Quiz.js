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
        <div>
            <p className="text-xs text-center  p-2 m-0 bg-orange-500 text-white">Do Not Refresh While Taking Self Assesment !</p>
            <div className="flex align-items-center justify-content-center">
                <Timer className={"mt-2"} minutes={1} onTimeUp={setQuizSubmitted} />
                <Divider layout="vertical" />
                <p
                    className="w-8rem text-center p-0  bg-green-300 text-white font-bold text-xl p-2 border-round border-1 border-green-800 scalein animation-duration-500 animation-iteration-1"
                    key={score}
                >
                    score : {score}
                </p>
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
