import { TEXT_SMALL } from "../../style";

export default function Error({ className, error = "There Was Some Error !" }) {
    return (
        <div className={`flex  align-items-center text-red-500 gap-2 ${className}`}>
            <i className="pi pi-exclamation-circle"></i>
            <p className={`${TEXT_SMALL} p-0 m-0`}>{error}</p>
        </div>
    );
}
