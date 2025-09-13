import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useCallback, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import FileInput from "../common/FileInput";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { addCarouselImage } from "../../redux/sliceTemplateConfig";

export default function DialogAddCarouselItem({ visible, closeDialog }) {
    const { requestAPI, showToast } = useAppContext();

    const [carouselImage, setCarouselImage] = useState();

    const [loading, setLoading] = useState();

    const dispatch = useDispatch();

    const addCarouselItem = useCallback(() => {
        requestAPI({
            requestPath: `configs/template/dashboard/carousel_images`,
            requestMethod: "PATCH",
            requestPostBody: carouselImage,
            setLoading: setLoading,
            parseResponseBody: false,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Carousel Item !", life: 2000 }),
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Carousel Item Added", life: 1000 });
                    dispatch(addCarouselImage(carouselImage));
                    setCarouselImage(); //reset form
                    closeDialog(); //close the dialog
                } else showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Carousel Item !", life: 2000 });
            },
        });
    }, [carouselImage, closeDialog, dispatch, requestAPI, showToast]);

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
                cdn_url={carouselImage?.source}
                setCDNUrl={(cdn_url) => setCarouselImage((prev) => ({ ...prev, source: cdn_url }))}
                disabled={loading}
            />

            <FloatLabel className="mt-5">
                <InputText
                    value={carouselImage?.click_link || ""}
                    id="click_link"
                    className="w-full"
                    onChange={(e) => setCarouselImage((prev) => ({ ...prev, click_link: e.target.value }))}
                    disabled={loading}
                />
                <label htmlFor="click_link">Action URL</label>
            </FloatLabel>

            <Button className="mt-3" label="Add Carousel Item" severity="warning" loading={loading} onClick={addCarouselItem} />
        </Dialog>
    );
}
