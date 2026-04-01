import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { Divider } from "primereact/divider";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { updateCurrentUser } from "../../redux/sliceUser";
import Ask from "../stream_selection_test_configuration/questions/Ask";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../style";
import BarcodeScanner from "react-qr-barcode-scanner";

export default function QuickTest() {
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

    const [scanningQR, setScanningQR] = useState();
    const [data, setData] = useState();

    if (!!loggedInUser?.stream_selection_test_taken) {
        return (
            <div className="flex flex-column gap-3 align-items-center justify-content-center h-full">
                <div className="flex flex-column align-items-center justify-content-center p-2 text-center">
                    <img src="/images/form_submit.png" alt="forbidden" className="w-6rem lg:w-8rem" />
                    <p className={`${TEXT_SIZE_NORMAL} font-bold`}>C.S.A.T. Test Already Given</p>
                    <p className={`${TEXT_SIZE_SMALL} text-color-secondary`}>
                        OOPS ! Your Result For C.S.A.T. is already published Or You Are Not Allowed To Attend Test
                    </p>
                </div>

                <BarcodeScanner
                    width={500}
                    height={500}
                    onUpdate={(err, result) => {
                        if (result) setData(result.text);
                        else setData("Not Found");
                    }}
                />
                {data}

                <Button icon="pi pi-qrcode" label="Scan Invite QR" severity="warning" />
                <Button icon="pi pi-clipboard" label="Explore Result" outlined onClick={() => navigate("../result")} />
            </div>
        );
    }
    return (
        <div className="flex flex-column h-full overflow-hidden">
            <TabHeader
                className={"mx-3 mt-2"}
                title="Press Start To Attend Test"
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
                currentQuestionIndex != null && (
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
                )
            ) : (
                <Error error="No Stream Selection Test Questions Found" />
            )}
        </div>
    );
}
