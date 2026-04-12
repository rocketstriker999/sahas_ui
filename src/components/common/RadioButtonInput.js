import { RadioButton } from "primereact/radiobutton";
import { TEXT_NORMAL } from "../../style";

export default function RadioButtonInput({ onChange, label, value, className, disabled }) {
    return (
        <div className={`flex align-items-center ${className} border-1 border-gray-300 p-2 border-round-xl ${TEXT_NORMAL}`}>
            <RadioButton disabled={disabled} name={label} value={label} onChange={onChange} checked={value === label} />
            <label className="ml-2">{label}</label>
        </div>
    );
}
