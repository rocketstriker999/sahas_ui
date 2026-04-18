import { Checkbox } from "primereact/checkbox";

export default function CheckboxInput({ disabled, label, checked, onChange, className }) {
    return (
        <div className={`text-color-secondary flex align-items-center   border-1 border-gray-300 py-3 px-2 border-round ${className}`}>
            <label className="flex-1" htmlFor={label}>
                {label}
            </label>
            <Checkbox disabled={disabled} inputId={label} onChange={({ checked }) => onChange(checked)} checked={checked} />
        </div>
    );
}
