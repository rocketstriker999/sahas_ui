import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import TabHeader from "../components/common/TabHeader";
import { Divider } from "primereact/divider";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import Ask from "../components/stream_selection_questions/Ask";
import { useNavigate } from "react-router-dom";
import { updateCurrentUser } from "../redux/sliceUser";

export default function StreamSelectionTest() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [questions, setQuestions] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
    const loggedInUser = useSelector((state) => state.stateUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: `stream-selection-questions`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (questions, responseCode) => {
                if (questions && responseCode === 200) {
                    setQuestions(questions);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Stream Selection Questions !", life: 2000 });
                }
            },
        });
    }, [loggedInUser?.stream_selection_test_taken, navigate, requestAPI, showToast]);

    const addStreamSelectionTest = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-tests`,
            requestMethod: "POST",
            requestPostBody: questions,
            setLoading,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Stream Selection Test Submitted", life: 1000 });
                    dispatch(updateCurrentUser({ stream_selection_test_taken: true }));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Submit Stream Selection Test !", life: 2000 });
                }
            },
        });
    }, [dispatch, questions, requestAPI, showToast]);

    const askNext = useCallback(() => {
        setCurrentQuestionIndex((prev) => (prev || 0) + 1);
    }, []);

    const askPrevious = useCallback(() => {
        setCurrentQuestionIndex((prev) => prev - 1);
    }, []);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <TabHeader
                className={"mx-3 mt-2"}
                title="Stream Selection Test"
                highlights={[`Answer To Following Questions`]}
                actionItems={[
                    <Button visible={currentQuestionIndex == null} onClick={() => setCurrentQuestionIndex(0)} outlined label="Start" severity="warning" />,
                    <Button
                        visible={currentQuestionIndex === questions?.length - 1}
                        onClick={addStreamSelectionTest}
                        outlined
                        label="Submit"
                        severity="warning"
                    />,
                ]}
            />
            <Divider />

            {loading ? (
                <Loading />
            ) : questions?.length ? (
                currentQuestionIndex != null ? (
                    <Ask
                        askNext={askNext}
                        askPrevious={askPrevious}
                        currentQuestionIndex={currentQuestionIndex}
                        total={questions?.length}
                        {...questions[currentQuestionIndex]}
                        canMoveToNext={currentQuestionIndex < questions?.length - 1}
                        canMoveToPrevious={currentQuestionIndex > 0}
                        setQuestions={setQuestions}
                    />
                ) : (
                    <span>Press Start Button To Take Stream Selection Test</span>
                )
            ) : (
                <Error error="No Stream Selection Test Questions Found" />
            )}
        </div>
    );
}
