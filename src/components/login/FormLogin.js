import {  useState } from "react";
import AskEmail from "./AskEmail";
import AskOTP from "./AskOTP";

export default function FormLogin({config}) {
  
  const [componenentState, setComponentState] = useState({viewIndex:0});
  
  

  const viewSelector = {
    0:<AskEmail config={config.ask_email} updateComponentState={setComponentState} />,
    1:<AskOTP config={config.ask_otp} componenentState={componenentState} />,
  }
  

  return viewSelector[componenentState.viewIndex]
   
}
