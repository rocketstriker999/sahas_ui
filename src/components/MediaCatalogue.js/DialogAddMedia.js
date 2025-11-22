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

export default function DialogAddMedia({ visible, closeDialog, setMediaCatalogue, chapterId }) {
    const { requestAPI, showToast } = useAppContext();

    const [media, setMedia] = useState({ chapter_id: chapterId, cdn_url: null });

    const [loading, setLoading] = useState();

    const { media_types = [] } = useSelector((state) => state.stateTemplateConfig?.chapter);

    const addMedia = useCallback(() => {
        requestAPI({
            requestPath: `media`,
            requestMethod: "POST",
            requestPostBody: media,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Media !", life: 2000 }),
            onResponseReceieved: (media, responseCode) => {
                if (media && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Media Added", life: 1000 });
                    setMediaCatalogue((prev) => [media, ...prev]);
                    setMedia(({ chapter_id }) => ({ chapter_id })); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Chapter !", life: 2000 });
            },
        });
    }, [closeDialog, media, requestAPI, setMediaCatalogue, showToast]);

    return (
        <Dialog pt={{ content: { className: "overflow-visible" } }} header={`Add New Media`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader className="pt-3" title="Add New Media" highlights={["Supported Media Extensions Are .mp4,.pdf,.jpg"]} />

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

            <FloatLabel className="flex-1 mt-5">
                <Dropdown
                    className="w-full"
                    value={media_types?.find((type) => type === media?.type)}
                    inputId="branch"
                    options={media_types}
                    optionLabel="title"
                    onChange={(e) => setMedia((prev) => ({ ...prev, type: e.value }))}
                />
                <label htmlFor="branch">Type</label>
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

            <Button className="mt-3" label="Add Media" severity="warning" loading={loading} onClick={addMedia} />
        </Dialog>
    );
}
