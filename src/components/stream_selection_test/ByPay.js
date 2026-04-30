import { useNavigate } from "react-router-dom";
import { TEXT_NORMAL, TEXT_SMALL } from "../../style";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

export default function ByPay() {
    const navigate = useNavigate();

    const { fees = 0 } = useSelector((state) => state.stateTemplateConfig?.stream_selection);

    return (
        <div className="flex flex-column align-items-center justify-content-center p-2 text-center">
            <img src="/images/pay_online.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className={`${TEXT_NORMAL} font-bold`}>Pay Online to Start</p>
            <p className={`${TEXT_SMALL} text-color-secondary text-center px-4`}>
                Complete online payment to start your Psychometric Test. UPI, Cards, Net Banking, and Wallet methods are supported.
            </p>
            <Button icon="pi pi-clipboard" label={`Pay ${fees} Rs`} severity="warning" onClick={() => navigate("../attempt")} />
        </div>
    );
}
