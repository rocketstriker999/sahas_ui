import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { useMemo, useState } from "react";
import { hasRequiredAuthority } from "../../../utils";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { useSelector } from "react-redux";
import TabHeader from "./TabHeader";
import { Divider } from "primereact/divider";

export default function Basics({ user, updateUser }) {
    const { branches = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const { authorities = [] } = useSelector((state) => state.stateUser);

    const [basics, setBasics] = useState(user);

    const disabled = useMemo(() => !hasRequiredAuthority(authorities, "WRITE_USERS"), [authorities]);

    return (
        <div>
            <TabHeader
                title="User's Basic Details & Profile"
                highlightOne={`Created At - ${basics?.created_on}`}
                highlightTwo={`Updated At - ${basics?.updated_at}`}
            />
            <Divider />
            <div className="p-3 flex flex-column gap-1">
                <FloatLabel>
                    <InputText
                        value={basics?.full_name}
                        id="fullname"
                        className="w-full"
                        onChange={(e) => setBasics((prev) => ({ ...prev, full_name: e.target.value }))}
                        disabled={disabled}
                    />
                    <label htmlFor="fullname">Full Name</label>
                </FloatLabel>
                <FloatLabel className="mt-4">
                    <InputText
                        value={basics?.phone}
                        id="phone"
                        className="w-full"
                        onChange={(e) => setBasics((prev) => ({ ...prev, phone: e.target.value }))}
                        disabled={disabled}
                    />
                    <label htmlFor="phone">Phone</label>
                </FloatLabel>
                <FloatLabel className="mt-4">
                    <Dropdown
                        value={branches?.find((branch) => branch.id === basics?.branch)}
                        inputId="branch"
                        options={branches}
                        optionLabel="title"
                        className="w-full"
                        onChange={(e) => setBasics((prev) => ({ ...prev, branch: e.value?.id }))}
                        disabled={disabled}
                    />
                    <label htmlFor="branch">Branch</label>
                </FloatLabel>
                <FloatLabel className="mt-4">
                    <InputTextarea
                        value={basics?.address}
                        id="address"
                        rows={5}
                        cols={30}
                        className="w-full"
                        onChange={(e) => setBasics((prev) => ({ ...prev, address: e.target.value }))}
                        disabled={disabled}
                    />
                    <label htmlFor="address">Address</label>
                </FloatLabel>

                <div className="px-3 border-1 border-gray-300 border-round mt-2 flex align-items-center">
                    <p className="flex-1">Active</p>
                    <InputSwitch checked={Boolean(basics?.active)} onChange={(e) => setBasics((prev) => ({ ...prev, active: e.value }))} disabled={disabled} />
                </div>

                <HasRequiredAuthority requiredAuthority="WRITE_USERS">
                    <Button className="mt-3" label="Update" severity="warning" onClick={() => updateUser(basics)} />
                </HasRequiredAuthority>
            </div>
        </div>
    );
}
