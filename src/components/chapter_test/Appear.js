import { useNavigate, useOutletContext } from "react-router-dom";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useEffect, useState } from "react";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import { Divider } from "primereact/divider";
import Summary from "./Summary";
import Questions from "./Questions";

export default function Appear() {
    const { testSelection, setTestResult } = useOutletContext();

    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();

    const [test, setTest] = useState({ currentQuestion: 0, score: 0, skip: 0, questionsAttended: 0, correctAnswers: 0, incorrectAnswers: 0 });

    useEffect(() => {
        console.log(test);
        setTestResult(test);
    }, [setTestResult, test]);

    const showResult = useCallback(() => {
        setTimeout(() => navigate("../result"), 500);
    }, [navigate]);

    const loadNextQuestion = () => {
        if (test?.currentQuestion + 1 >= test?.questions?.length) {
            return showResult();
        }
        setTest((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    };

    useEffect(() => {
        if (!test?.questions?.length) {
            requestAPI({
                requestPath: `chapters/test`,
                requestGetQuery: { subject: testSelection?.subject?.subject_id, chapters: testSelection?.chapters?.map(({ id }) => id) },
                setLoading: setLoading,
                onRequestStart: setError,
                onRequestFailure: setError,
                onResponseReceieved: (test, responseCode) => {
                    if (test && responseCode === 200) {
                        setTest((prev) => ({ ...prev, ...test }));
                    }
                },
            });
        }
    }, [test, requestAPI, testSelection]);

    if (loading) {
        return <Loading message={"Fetching Questions"} className={"mt-2"} />;
    }

    if (!test?.questions?.length || error) {
        return <NoContent error={"Unable to Start Quiz"} className={"mt-2"} />;
    }

    return (
        <div className="flex-1 flex flex-column h-full min-h-0">
            <p className="text-xs text-center  p-2 m-0 bg-orange-500 text-white">Do Not Refresh While Taking Self Test !</p>

            <Summary test={test} setTest={setTest} showResult={showResult} />

            <Divider />

            <Questions loadNextQuestion={loadNextQuestion} test={test} setTest={setTest} />
        </div>
    );
}
