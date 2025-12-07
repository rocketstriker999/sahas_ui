import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";
import FileInput from "../common/FileInput";

export default function DialogEditMedia({ visible, closeDialog, setMediaCatalogue, chapterId, ...props }) {
    const { requestAPI, showToast } = useAppContext();

    const [media, setMedia] = useState(props);
    const [loading, setLoading] = useState();

    const { media_types = [] } = useSelector((state) => state.stateTemplateConfig?.chapter);

    const editMedia = useCallback(() => {
        requestAPI({
            requestPath: `media`,
            requestMethod: "PATCH",
            requestPostBody: media,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Edit Media !", life: 2000 }),
            onResponseReceieved: (updatedMedia, responseCode) => {
                if (updatedMedia && responseCode === 200) {
                    showToast({ severity: "success", summary: "Added", detail: "Media Updated", life: 1000 });
                    setMediaCatalogue((prev) => prev?.map((media) => (media?.id === updatedMedia.id ? updatedMedia : media)));
                    setMedia(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Media !", life: 2000 });
            },
        });
    }, [closeDialog, media, requestAPI, setMediaCatalogue, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Edit Media`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Edit Media" />

            <FloatLabel className="mt-5">
                <InputText
                    value={media?.title || ""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setMedia((prev) => ({ ...prev, title: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="title">Title</label>
            </FloatLabel>

            <FileInput
                className={"mt-3"}
                label={media?.type}
                type={media?.type?.toLowerCase()}
                cdn_url={media?.cdn_url}
                setCDNUrl={(cdn_url) => setMedia((prev) => ({ ...prev, cdn_url }))}
                disabled={loading}
            />

            <FloatLabel className="mt-5">
                <InputText
                    value={media?.external_url || ""}
                    id="external_url"
                    className="w-full"
                    onChange={(e) => setMedia((prev) => ({ ...prev, external_url: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="external_url">External URL</label>
            </FloatLabel>

            <Button className="mt-3" label="Edit Media" severity="warning" loading={loading} onClick={editMedia} />
        </Dialog>
    );
}
