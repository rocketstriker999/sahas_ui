import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import Question from "./Question";

export default function Questions({ test, setTest, loadNextQuestion }) {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-column min-h-0">
            <Question
                test={test}
                setTest={setTest}
                currentQuestion={test?.currentQuestion}
                loadNextQuestion={loadNextQuestion}
                {...test?.questions?.[test?.currentQuestion]}
            />
            <Divider />
            <div className="flex align-items-center justify-content-between px-2">
                <Button label="Cancel" size="small" severity="danger" text icon="pi pi-times" iconPos="left" onClick={() => navigate(-1)} />
                <Button
                    size="small"
                    label="Skip"
                    severity="success"
                    text
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    onClick={() => {
                        setTest((prev) => ({ ...prev, skip: (prev?.skip || 0) + 1 }));
                        loadNextQuestion();
                    }}
                />
            </div>
        </div>
    );
}
