import { RadioButton } from "primereact/radiobutton";

export default function RadioButtonInput({ onChange, label, value, className }) {
    return (
        <div className={`flex align-items-center ${className} border-1 border-gray-300 p-3 border-round-xl`}>
            <RadioButton name={label} value={label} onChange={onChange} checked={value === label} />
            <label className="ml-2">{label}</label>
        </div>
    );
}
