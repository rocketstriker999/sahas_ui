import NoContent from "../common/NoContent";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";
import DialogAddCarouselItem from "./DialogAddCarouselItems";
import Image from "./Carousel/Image";
import { Carousel } from "primereact/carousel";
import { classNames } from "primereact/utils";

export default function CarouselImages({ className, images }) {
    const [dialogAddCarouselItem, setDialogAddCarouselItem] = useState({
        visible: false,
    });

    const closeDialogAddCarouselItem = useCallback(() => {
        setDialogAddCarouselItem((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className={`flex flex-column align-items-center  justify-content-center ${className}`}>
            {images?.length ? (
                <Carousel
                    pt={{ indicators: classNames(" py-1") }}
                    circular
                    autoplayInterval={3000}
                    showNavigators={false}
                    value={images}
                    numVisible={1}
                    numScroll={1}
                    itemTemplate={Image}
                />
            ) : (
                <NoContent />
            )}
            <Button
                icon="pi pi-plus"
                severity="warning"
                aria-label="Favorite"
                onClick={() => setDialogAddCarouselItem((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddCarouselItem }))}
            />

            <DialogAddCarouselItem {...dialogAddCarouselItem} />
        </div>
    );
}
