import { Button } from "primereact/button";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function QuizHead() {
    const { course } = useOutletContext();

    const navigate = useNavigate();

    return (
        !!course?.enrollment?.digital_access && (
            <div className="flex align-items-center gap-2 p-2">
                <Button
                    className="flex-1"
                    onClick={() => {
                        navigate(`../quiz`);
                    }}
                    label="Self Assesment"
                    iconPos="right"
                    icon="pi pi-question-circle"
                />
                <Button severity="warning" onClick={() => {}} icon="pi pi-history" />
            </div>
        )
    );
}
