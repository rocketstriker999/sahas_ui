import { Dialog } from "primereact/dialog";
import TabHeader from "../common/TabHeader";
import FileInput from "../common/FileInput";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { InputNumber } from "primereact/inputnumber";

export default function DialogAddUser({ visible, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const { branches = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const navigate = useNavigate();

    const [basics, setBasics] = useState();
    const [loading, setLoading] = useState();

    const addUser = useCallback(() => {
        requestAPI({
            requestPath: `users`,
            requestMethod: "POST",
            requestPostBody: basics,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add User !", life: 2000 }),
            onResponseReceieved: (basics, responseCode) => {
                if (basics && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "User Added Succesfully", life: 1000 });
                    setBasics();
                    closeDialog();
                    navigate(`/manage-users/${basics?.id}/basics`);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add User !", life: 2000 });
                }
            },
        });
    }, [basics, closeDialog, navigate, requestAPI, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New User`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New User" highlights={["New User Can Be Added", "Inquiries Can Be Managed Post Creation"]} />

            <FileInput
                className={"mt-3"}
                label="User Image"
                type="image"
                cdn_url={basics?.image}
                setCDNUrl={(cdn_url) => setBasics((prev) => ({ ...prev, image: cdn_url }))}
                disabled={loading}
            />
            <FloatLabel className="mt-4">
                <InputText
                    value={basics?.full_name}
                    id="fullname"
                    className="w-full"
                    onChange={(e) => setBasics((prev) => ({ ...prev, full_name: e.target.value }))}
                />
                <label htmlFor="fullname">Full Name</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputText value={basics?.email} id="email" className="w-full" onChange={(e) => setBasics((prev) => ({ ...prev, email: e.target.value }))} />
                <label htmlFor="email">Email</label>
            </FloatLabel>
            <FloatLabel className="mt-4">
                <InputNumber
                    useGrouping={false}
                    className="w-full"
                    value={basics?.phone}
                    id="phone"
                    onChange={(e) => setBasics((prev) => ({ ...prev, phone: e.value }))}
                />
                <label htmlFor="phone">Phone</label>
            </FloatLabel>

            <FloatLabel className="mt-4">
                <Dropdown
                    className="w-full"
                    value={branches?.find(({ id }) => id === basics?.branch_id)}
                    inputId="branch"
                    options={branches}
                    optionLabel="title"
                    onChange={(e) => setBasics((prev) => ({ ...prev, branch_id: e.value?.id }))}
                />
                <label htmlFor="branch">Branch</label>
            </FloatLabel>

            <FloatLabel className="mt-4">
                <InputTextarea
                    value={basics?.address || ""}
                    id="address"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setBasics((prev) => ({ ...prev, address: e.target.value }))}
                />
                <label htmlFor="address">Address</label>
            </FloatLabel>

            <Button className="mx-3 my-2" label="Add New User" severity="warning" onClick={addUser} loading={loading} disabled={!basics} />
        </Dialog>
    );
}
