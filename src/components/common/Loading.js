import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading({ message, className, type = "small" }) {
    const sizes = {
        large: { width: "50px", height: "50px" },
        small: { width: "25px", height: "25px" },
    };

    return (
        <div className={`flex flex-column justify-content-center text-center ${className}`}>
            <ProgressSpinner style={sizes[type]} strokeWidth="6" fill="var(--surface-ground)" animationDuration=".5s" />
            {message && <span>{message}</span>}
        </div>
    );
}
