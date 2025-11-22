import { Button } from "primereact/button";
import Thumbnail from "./Thumbnail";

export default function Preview({ type, preview, setPreview, setCDNUrl, label, disabled }) {
    return (
        <div className="flex flex-column align-items-center justify-content-center gap-3">
            {preview && <Thumbnail {...{ type, preview }} />}
            <Button
                icon="pi pi-times"
                rounded
                outlined
                severity="danger"
                aria-label="Cancel"
                onClick={() => {
                    setCDNUrl(null);
                    setPreview(null);
                }}
                disabled={disabled}
            />
            <span className="text-sm text-gray-500">Selected {label}</span>
        </div>
    );
}
