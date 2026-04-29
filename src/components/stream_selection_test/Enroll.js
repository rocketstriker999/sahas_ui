import { Button } from "primereact/button";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { TEXT_NORMAL, TEXT_SUBTITLE } from "../../style";
import { useState } from "react";
import QrScanner from "./QrScanner";

export default function Enroll() {
    const loggedInUser = useSelector((state) => state.stateUser);

    const [scanningQR, setScanningQR] = useState(true);

    return (
        <div className="flex-1 flex flex-column justify-content-center p-3 gap-3">
            <div className={`font-semibold text-center ${TEXT_SUBTITLE}`}>Start Psychometric Test</div>
            {!!loggedInUser?.stream_selection_test_allowed ? (
                <Button label="Start" severity="warning" className={TEXT_NORMAL} />
            ) : (
                <QrScanner scanningQR={scanningQR} setScanningQR={setScanningQR} />
            )}
            <Outlet />
        </div>
    );
}
