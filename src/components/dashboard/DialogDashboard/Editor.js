import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import FileInput from "../../common/FileInput";
import { InputTextarea } from "primereact/inputtextarea";
import { TEXT_SIZE_NORMAL } from "../../../style";

export default function Editor({ dialog, setDialog }) {
    return (
        <div>
            <div className="p-inputgroup ">
                <span className={`p-inputgroup-addon ${TEXT_SIZE_NORMAL}`}>
                    <i className="pi pi-file-word"></i>
                </span>
                <InputText
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                    onChange={(e) => setDialog((prev) => ({ ...prev, title: e.target.value }))}
                    value={dialog?.title || ""}
                    placeholder="Title"
                />
            </div>
            <FileInput
                className={"mt-2"}
                label="Product Category"
                type="image"
                cdn_url={dialog?.media_url}
                setCDNUrl={(cdn_url) => setDialog((prev) => ({ ...prev, media_url: cdn_url }))}
                // disabled={loading}
                pt={{
                    root: { className: TEXT_SIZE_NORMAL },
                }}
            />

            <div className="p-inputgroup mt-2">
                <span className={`p-inputgroup-addon ${TEXT_SIZE_NORMAL}`}>
                    <i className="pi pi-hashtag"></i>
                </span>
                <InputText
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                    onChange={(e) => setDialog((prev) => ({ ...prev, heading: e.target.value }))}
                    value={dialog?.heading || ""}
                    placeholder="Heading"
                />
            </div>

            <FloatLabel className="mt-5">
                <InputTextarea
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                    value={dialog?.description || ""}
                    id="description"
                    rows={5}
                    cols={30}
                    className="w-full"
                    onChange={(e) => setDialog((prev) => ({ ...prev, description: e.target.value }))}
                />
                <label htmlFor="description">Description</label>
            </FloatLabel>

            <div className="p-inputgroup mt-2">
                <span className={`p-inputgroup-addon ${TEXT_SIZE_NORMAL}`}>
                    <i className="pi pi-asterisk"></i>
                </span>
                <InputText
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                    value={dialog?.note || ""}
                    onChange={(e) => setDialog((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder="Redirect URL"
                />
            </div>
            <div className="p-inputgroup mt-2">
                <span className={`p-inputgroup-addon ${TEXT_SIZE_NORMAL}`}>
                    <i className="pi pi-link"></i>
                </span>
                <InputText
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                    onChange={(e) => setDialog((prev) => ({ ...prev, redirect_url: e.target.value }))}
                    value={dialog?.redirect_url || ""}
                    placeholder="Redirect URL"
                />
            </div>
        </div>
    );
}
