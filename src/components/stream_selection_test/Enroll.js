import { Button } from "primereact/button";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { TEXT_NORMAL, TEXT_SUBTITLE, TEXT_TITLE } from "../../style";
import { useState } from "react";
import QrScanner from "./QrScanner";
import ByPay from "./ByPay";
import { Divider } from "primereact/divider";

export default function Enroll() {
    const loggedInUser = useSelector((state) => state.stateUser);

    const [scanningQR, setScanningQR] = useState(true);

    return (
        <div className="flex-1 flex flex-column justify-content-center min-h-0 h-full p-3 ">
   


            {!!loggedInUser?.stream_selection_test_allowed ? (
                    <Button label="Start" severity="warning" className={TEXT_NORMAL} />
                ) : (
                    <div>
                        <QrScanner scanningQR={scanningQR} setScanningQR={setScanningQR} />
                        <Divider />
                        <ByPay />
                    </div>
                )}

        </div>
    );
}
