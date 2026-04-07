import { Button } from "primereact/button";
import { TEXT_NORMAL } from "../../../style";
import { useCallback, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import ProgressiveControl from "../../common/ProgressiveControl";

export default function Download({ entity, searchQuery }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const downloadUsers = useCallback(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `${entity}/download`,
            requestGetQuery: searchQuery,
            setLoading,
            onResponseReceieved: ({ cdn_url, error }, responseCode) => {
                if (responseCode === 201) window.open(cdn_url, "_blank");
                else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Download Users !", life: 2000 });
            },
        });
    }, [entity, requestAPI, searchQuery, showToast]);

    return (
        <ProgressiveControl
            loading={loading}
            control={
                <Button
                    severity="contrast"
                    icon="pi pi-download"
                    className="p-button-warning"
                    pt={{
                        icon: { className: TEXT_NORMAL },
                    }}
                    onClick={downloadUsers}
                />
            }
        />
    );
}
