import { useCallback, useRef, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../Loading";

export default function PlaceHolder({ label, setFile }) {
    const fileInputRef = useRef(null);
    const { showToast, requestAPI } = useAppContext();
    const [loading, setLoading] = useState();

    const onFileSelected = useCallback(
        (event) => {
            const file = event.target?.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                requestAPI({
                    requestPath: `media`,
                    requestMethod: "POST",
                    requestService: process.env.REACT_APP_MEDIA_PATH,
                    requestPostBody: formData,
                    setLoading: setLoading,
                    onResponseReceieved: ({ file }, responseCode) => {
                        if (file && responseCode === 201) {
                            showToast({ severity: "success", summary: "Uploaded", detail: "File Uploaded", life: 1000 });
                            setFile(file);
                        } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Upload File !", life: 2000 });
                    },
                });
            } else {
                showToast({ severity: "error", summary: "Failed", detail: "Failed To Pick File !", life: 2000 });
            }
        },
        [requestAPI, setFile, showToast]
    );
    return (
        <div className="flex flex-column align-items-center justify-content-center gap-3" onClick={() => fileInputRef.current.click()}>
            {loading ? <Loading /> : <i className="pi pi-cloud-upload border-circle bg-gray-200 text-gray-500 p-4 text-3xl"></i>}
            <span className="text-sm text-gray-500">Select {label}</span>
            <input type="file" ref={fileInputRef} onChange={onFileSelected} accept="image/*" style={{ display: "none" }} />
        </div>
    );
}
