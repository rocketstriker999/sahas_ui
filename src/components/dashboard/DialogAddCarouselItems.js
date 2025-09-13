import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import FileInput from "../common/FileInput";

export default function DialogAddCarouselItem({ visible, closeDialog, setImages }) {
    const { requestAPI, showToast } = useAppContext();

    const [carouselItem, setCarouselItem] = useState({ type: "image" });
    const [loading, setLoading] = useState();

    const addCarouselItem = useCallback(() => {
        requestAPI({
            requestPath: `product-categories`,
            requestMethod: "POST",
            requestPostBody: carouselItem,
            setLoading: setLoading,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Carousel Item !", life: 2000 }),
            onResponseReceieved: (carouselItem, responseCode) => {
                if (carouselItem && responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Carousel Item Added", life: 1000 });
                    setImages((prev) => [carouselItem, ...prev]);
                    setCarouselItem(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Carousel Item !", life: 2000 });
            },
        });
    }, [carouselItem, closeDialog, requestAPI, setImages, showToast]);

    return (
        <Dialog header={`Add New Carousel Item`} visible={visible} className="w-11" onHide={closeDialog}>
            <TabHeader
                className="pt-3"
                title="Add New Carousel Item"
                highlights={["New Carousel Item Can Be Added", "Videos & Images Can Be Added As Carousel Items"]}
            />

            <FileInput
                className={"mt-3"}
                label="Carousel Item"
                type="image"
                cdn_url={carouselItem?.source}
                setCDNUrl={(cdn_url) => setCarouselItem((prev) => ({ ...prev, source: cdn_url }))}
                disabled={loading}
            />

            <Button className="mt-3" label="Add Carousel Item" severity="warning" loading={loading} onClick={addCarouselItem} />
        </Dialog>
    );
}
