import { Button } from "primereact/button";

export default function Preview({ file, setFile, label }) {
    return (
        <div className="flex flex-column align-items-center justify-content-center gap-3">
            <img className="border-circle " src={file} alt="Preview" style={{ width: "6rem", height: "6rem", objectFit: "cover" }} />
            <Button icon="pi pi-times " rounded outlined severity="danger" aria-label="Cancel" onClick={() => setFile(false)} />
            <span className="text-sm text-gray-500">Selected {label}</span>
        </div>
    );
}
