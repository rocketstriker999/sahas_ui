import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading({ message }) {
    return (
        <div className="flex flex-column justify-content-center p-7 text-center">
            <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="4" animationDuration="1s" />
            <p>{message}</p>
        </div>
    );
}
