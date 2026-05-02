import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TEXT_NORMAL, TEXT_SMALL, TEXT_SUBTITLE } from "../../style";
import ByQR from "./ByQR";
import ByPay from "./ByPay";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { KEY_GUEST } from "../../constants";
import Loading from "../common/Loading";


export default function Enroll() {
    const loggedInUser = useSelector((state) => state.stateUser);
    const navigate = useNavigate(); 
    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [streamSelectionTestResult, setStreamSelectionTestResult] = useState();


    useEffect(() => {
        if (!!loggedInUser && !loggedInUser?.stream_selection_test_allowed)
            requestAPI({
                requestPath: `users/stream-selection-test-results/latest`,
                requestMethod: "GET",
                requestHeaders: {
                    [KEY_GUEST]: loggedInUser?.id,
                },
                setLoading,
                onResponseReceieved: ({ error, ...testResult }, responseCode) => {
                    if (testResult && responseCode === 200) {
                        setStreamSelectionTestResult(testResult);
                    } 
                },
            });
    }, [loggedInUser, requestAPI]);



    if (loading) {
        return <Loading message={"Fetching Details..."} />;
    }

    console.log(loggedInUser);



    return (
        <div className="flex-1 flex flex-column justify-content-center min-h-0 h-full p-3 overflow-scroll">

            {!!loggedInUser?.stream_selection_test_allowed ? (
                <div className="flex flex-column align-items-center justify-content-center p-2 text-center  ">
                    <img src="/images/test.png" alt="start test" className="w-6rem" />
                    <p className={`${TEXT_SUBTITLE} font-bold m-2`}>You Are Ready To Start</p>
                    <p className={`${TEXT_SMALL} text-color-secondary text-center px-4`}>
                        Your profile is verified. Start the Psychometric Test now and submit all questions to view your stream recommendation.
                    </p>
                    <Button outlined label="Start" severity="warning" icon="pi pi-play" className={TEXT_NORMAL} onClick={() => navigate("../attempt", { replace: true })} />
                </div>
            ) : (
                <div>
                    <ByQR />
                    <Divider />
                    <ByPay loading={loading} setLoading={setLoading} />
                </div>
            )}

            <Divider />

            {!!streamSelectionTestResult?.result && (
                <div className="border-1 surface-border border-round p-3 bg-primary-50 text-center">
                    <p className={`${TEXT_NORMAL} font-bold m-0`}>Your previous test result is available.</p>
                    <p className={`${TEXT_SMALL} text-color-secondary mt-2 mb-3`}>
                        You can view your saved psychometric result any time.
                    </p>
                    <Button
                        icon="pi pi-chart-line"
                        label="View Previous Result"
                        severity="info"
                        className={TEXT_NORMAL}
                        onClick={() => navigate("/stream-selection-test/result", { state: { streamSelectionTestResult } })}
                    />
                </div>
            )}
        </div>
    );
}
