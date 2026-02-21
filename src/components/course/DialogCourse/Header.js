import { SelectButton } from "primereact/selectbutton";
import { TEXT_SIZE_NORMAL } from "../../../style";

export default function Header({ dialogCourse, dialog, setDialog }) {
    const options = ["Enable", "Disable"];

    if (dialogCourse?.editing)
        return (
            <div className="flex align-items-center justify-content-between">
                <span className="font-bold white-space-nowrap">Editing</span>
                <SelectButton
                    pt={{
                        button: { className: `px-3 py-2 ${TEXT_SIZE_NORMAL}` },
                    }}
                    value={!!dialog?.active ? options[0] : options[1]}
                    onChange={(e) => setDialog((prev) => ({ ...prev, active: e.value === "Enable" }))}
                    options={options}
                />
            </div>
        );

    return <span className="font-bold white-space-nowrap">{dialogCourse?.title}</span>;
}
