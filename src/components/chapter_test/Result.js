import { Button } from "primereact/button";
import { useLocation, useNavigate, useOutlet, useOutletContext } from "react-router-dom";

export default function Result() {
    const { testResult } = useOutletContext();

    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-column h-full min-h-0 p-2 gap-2">
            <span>Score {testResult?.correctAnswers}</span>
            <span>Incorrec Answers {testResult?.incorrectAnswers}</span>
            <span>Skip {testResult?.skip}</span>
            <span>Attended {testResult?.questionsAttended}</span>

            <Button
                label="Retry"
                onClick={() => {
                    navigate("../selection");
                }}
            />
        </div>
    );
}
