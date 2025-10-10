import { ColorPicker } from "primereact/colorpicker";

export default function ColorInput({ className, color, setColor }) {
    return (
        <div style={{ touchAction: "none" }} className={`p-2 border-1 border-gray-300 border-round flex align-items-center ${className}`}>
            <span className="flex-1">Background Color - {color}</span>
            <ColorPicker format="hex" value={color} onChange={(e) => setColor("#".concat(e.value))} />
        </div>
    );
}
