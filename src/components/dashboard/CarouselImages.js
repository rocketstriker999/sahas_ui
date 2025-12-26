import { Button } from "primereact/button";
import { useCallback, useState } from "react";
import DialogAddCarouselItem from "./DialogAddCarouselItems";
import Image from "./Carousel/Image";
import { Carousel } from "primereact/carousel";
import { classNames } from "primereact/utils";
import { TEXT_SIZE_NORMAL } from "../../style";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function CarouselImages({ className, images }) {
    const [dialogAddCarouselItem, setDialogAddCarouselItem] = useState({
        visible: false,
    });

    const closeDialogAddCarouselItem = useCallback(() => {
        setDialogAddCarouselItem((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className={`flex flex-column align-items-center  justify-content-center ${className}`}>
            {!!images?.length && (
                <Carousel
                    pt={{ indicators: classNames("py-1") }}
                    circular
                    autoplayInterval={3000}
                    showNavigators={false}
                    value={images}
                    numVisible={1}
                    numScroll={1}
                    itemTemplate={Image}
                />
            )}
            <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_FEATURE_CAROUSEL}>
                <Button
                    className="mt-1"
                    icon="pi pi-plus"
                    severity="warning"
                    aria-label="Favorite"
                    onClick={() => setDialogAddCarouselItem((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddCarouselItem }))}
                    pt={{
                        icon: { className: TEXT_SIZE_NORMAL },
                    }}
                />
            </HasRequiredAuthority>

            {dialogAddCarouselItem?.visible && (
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_FEATURE_CAROUSEL}>
                    <DialogAddCarouselItem {...dialogAddCarouselItem} />
                </HasRequiredAuthority>
            )}
        </div>
    );
}
