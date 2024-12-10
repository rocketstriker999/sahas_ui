import { useState } from "react";
import AskEmail from "./AskEmail";
import AskOTP from "./AskOTP";

export default function FormLogin() {
    const [componenentState, setComponentState] = useState({ viewIndex: 0 });

    const viewSelector = {
        0: <AskEmail updateComponentState={setComponentState} />,
        1: <AskOTP componenentState={componenentState} />,
    };

    return viewSelector[componenentState.viewIndex];
}
