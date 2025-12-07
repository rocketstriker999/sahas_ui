import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { addRole } from "../../redux/sliceTemplateConfig";
import { TEXT_SIZE_SMALL, TITLE_TEXT } from "../../style";

export default function DialogAddRole({ visible, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [role, setRole] = useState();
    const [loading, setLoading] = useState();

    const dispatch = useDispatch();

    const addNewRole = useCallback(() => {
        requestAPI({
            requestPath: `roles`,
            requestMethod: "POST",
            requestPostBody: role,
            setLoading: setLoading,
            onResponseReceieved: (role, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Role Added", life: 1000 });
                    dispatch(addRole(role));
                    setRole(); //reset this form
                    closeDialog(); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Role !", life: 2000 });
                }
            },
        });
    }, [closeDialog, dispatch, requestAPI, role, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Role`} visible={visible} className="w-11" onHide={closeDialog}
            pt={{
                headertitle: { className: TITLE_TEXT },
            }}>
            <TabHeader className="pt-3" title="Add New Role" highlights={["Role Will be Added Immidiatly", "Authorities Can Be Mapped To Role"]} />

            <FloatLabel className="mt-5">
                <InputText
                    value={role?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setRole((prev) => ({ ...prev, title: e.target.value.toUpperCase() }))}
                    disabled={loading}
                    pt={{
                        root: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <label htmlFor="title" className={`${TEXT_SIZE_SMALL}`}>Title</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Role" severity="warning" loading={loading} onClick={addNewRole}
                pt={{
                    label: { className: TEXT_SIZE_SMALL },
                }} />
        </Dialog>
    );
}
