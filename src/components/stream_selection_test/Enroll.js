import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TEXT_NORMAL, TEXT_SMALL, TEXT_SUBTITLE } from "../../style";
import ByQR from "./QrScanner";
import ByPay from "./ByPay";
import { Divider } from "primereact/divider";

export default function Enroll() {
    const loggedInUser = useSelector((state) => state.stateUser);
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-column justify-content-center min-h-0 h-full p-3 ">

            {!!loggedInUser?.stream_selection_test_allowed ? (
                <div className="flex flex-column align-items-center justify-content-center p-2 text-center  ">
                    <img src="/images/test.png" alt="start test" className="w-6rem" />
                    <p className={`${TEXT_SUBTITLE} font-bold m-2`}>You Are Ready To Start</p>
                    <p className={`${TEXT_SMALL} text-color-secondary text-center px-4`}>
                        Your profile is verified. Start the Psychometric Test now and submit all questions to view your stream recommendation.
                    </p>
                    <Button outlined label="Start" severity="warning" icon="pi pi-play" className={TEXT_NORMAL} onClick={() => navigate("../attempt",{replace: true})} />
                </div>
            ) : (
                <div>
                    <ByQR />
                    <Divider />
                    <ByPay />
                </div>
            )}
        </div>
    );
}
