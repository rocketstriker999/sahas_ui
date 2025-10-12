import { ColorPicker } from "primereact/colorpicker";
import { Checkbox } from "primereact/checkbox";

export default function ColorInput({ className, color, setColor }) {
    return (
        <div style={{ touchAction: "none" }} className={`p-2 border-1 border-gray-300 border-round flex align-items-center ${className}`}>
            <div className="flex align-items-center flex-1">
                <Checkbox inputId="color" onChange={(e) => setColor(e.checked ? "#000" : null)} checked={!!color} />
                <label htmlFor="color" className="ml-2">
                    Custom Background Color
                </label>
            </div>
            {color && <ColorPicker format="hex" value={color} onChange={(e) => setColor("#".concat(e.value))} />}
        </div>
    );
}
