import { useState } from "react";
import { useInterval } from "primereact/hooks";
import { Knob } from "primereact/knob";
import { Tag } from "primereact/tag";

export default function Timer({ minutes = 0, onTimeUp, className }) {
    const totalSeconds = minutes * 60;
    const [seconds, setSeconds] = useState(totalSeconds);
    const [active, setActive] = useState(true);

    useInterval(
        () => {
            if (seconds > 0) {
                setSeconds((prev) => prev - 1);
            } else {
                setActive(false);
                if (onTimeUp) onTimeUp(true); // Callback to trigger end of quiz
            }
        },
        1000,
        active,
    );

    if (!minutes) return null;

    // Helper to format 00:00
    const formatTime = (total) => {
        const mins = Math.floor(total / 60);
        const secs = total % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Determine color based on time remaining (Red when under 20%)
    const isRunningLow = seconds < totalSeconds * 0.2;

    return (
        <div
            className={`flex flex-column align-items-center gap-2 ${className} ${!!isRunningLow && `fadeout animation-duration-1000 animation-iteration-infinite`}`}
        >
            <Knob
                value={seconds}
                max={totalSeconds}
                readOnly
                size={80}
                valueTemplate={formatTime(seconds)}
                valueColor={isRunningLow ? "var(--red-500)" : "var(--primary-color)"}
                rangeColor="var(--surface-border)"
                strokeWidth={8}
            />

            <Tag icon="pi pi-clock" severity={isRunningLow ? "danger" : "info"} value={isRunningLow ? "Hurry up!" : "Time Remaining"} className="px-3" />
        </div>
    );
}
