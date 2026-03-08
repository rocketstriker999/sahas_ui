import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import CheckboxInput from "../common/CheckBoxInput";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function DialogAddChapterType({ setChapterTypes, visible, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [chapterType, setChapterType] = useState();
    const [loading, setLoading] = useState();

    const addChapterType = useCallback(() => {
        requestAPI({
            requestPath: `chapter-types`,
            requestMethod: "POST",
            requestPostBody: chapterType,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Chapter Type !", life: 2000 }),
            onResponseReceieved: (chapterType, responseCode) => {
                if (chapterType && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Chapter Type Added", life: 1000 });
                    setChapterTypes((prev) => [chapterType, ...prev]);
                    setChapterType(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Chapter Type !", life: 2000 });
            },
        });
    }, [chapterType, closeDialog, requestAPI, setChapterTypes, showToast]);

    return (
        <Dialog pt={{ content: classNames("overflow-none") }} header={`Add New Chapters Type`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader
                className="pt-3"
                title="Add New Chapter Type"
                highlights={["New Chapter Type Can Be Added", "Green Indicates No Enrollment Is Required"]}
            />

            <FloatLabel className="mt-5">
                <InputText
                    value={chapterType?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setChapterType((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <CheckboxInput
                className={"mt-3"}
                label={"Requires Digital Enrollment Access"}
                checked={!!chapterType?.requires_enrollment_digital_access}
                onChange={(checked) => setChapterType((prev) => ({ ...prev, requires_enrollment_digital_access: checked }))}
            />

            <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_CHAPTER_TYPES}>
                <Button className="mt-3" label="Add Chapter Type" severity="warning" loading={loading} onClick={addChapterType} />
            </HasRequiredAuthority>
        </Dialog>
    );
}
