import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { InputTextarea } from "primereact/inputtextarea";
import { addAuthority } from "../../redux/sliceTemplateConfig";

export default function DialogAddAuthority({ addingAuthority, setAddingAuthority }) {
    const { requestAPI, showToast } = useAppContext();

    const [authority, setAuthority] = useState();
    const [loading, setLoading] = useState();

    const dispatch = useDispatch();

    const addNewAuthority = useCallback(() => {
        requestAPI({
            requestPath: `authorities`,
            requestMethod: "POST",
            requestPostBody: authority,
            setLoading: setLoading,
            onResponseReceieved: (authority, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Authority Added", life: 1000 });
                    //addhere
                    //setEnrollments(enrollments);
                    dispatch(addAuthority(authority));
                    setAuthority(); //reset this form
                    setAddingAuthority(() => false); //close the dialog
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Authority !", life: 2000 });
                }
            },
        });
    }, [authority, dispatch, requestAPI, setAddingAuthority, showToast]);

    return (
        <Dialog header={`Add New Authority`} visible={addingAuthority} className="w-11" onHide={() => setAddingAuthority(false)}>
            <TabHeader className="pt-3" title="Add New Authority" highlights={["Authority Will be Added Immidiatly", "Authority Can Be Mapped To Role"]} />

            <FloatLabel className="mt-5">
                <InputText
                    value={authority?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setAuthority((prev) => ({ ...prev, title: e.target.value.toUpperCase() }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <FloatLabel className="mt-4">
                <InputTextarea
                    value={authority?.description || ""}
                    id="description"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setAuthority((prev) => ({ ...prev, description: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="description">Description</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Authority" severity="warning" loading={loading} onClick={addNewAuthority} />
        </Dialog>
    );
}
