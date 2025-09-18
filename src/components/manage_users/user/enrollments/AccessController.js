import { Checkbox } from "primereact/checkbox";

export default function AccessController({ enrollment, setEnrollment }) {
    return (
        <div className="border-1 border-round border-gray-300 p-3 flex justify-content-between align-items-center mt-3">
            <div className="flex align-items-center gap-2">
                <label htmlFor="on_site_access">On Site Access</label>
                <Checkbox
                    inputId="on_site_access"
                    onChange={({ checked }) => setEnrollment((prev) => ({ ...prev, on_site_access: checked }))}
                    checked={enrollment?.on_site_access}
                />
            </div>

            <div className="flex align-items-center gap-2">
                <label htmlFor="digital_access">Digital Access</label>
                <Checkbox
                    inputId="digital_access"
                    onChange={({ checked }) => setEnrollment((prev) => ({ ...prev, digital_access: checked }))}
                    checked={enrollment?.digital_access}
                />
            </div>
        </div>
    );
}
