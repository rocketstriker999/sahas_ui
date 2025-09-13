import { Galleria } from "primereact/galleria";
import { classNames } from "primereact/utils";
import NoContent from "../common/NoContent";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";
import DialogAddCarouselItem from "./DialogAddCarouselItems";

export default function Carousel({ className, images }) {
    const [dialogAddCarouselItem, setDialogAddCarouselItem] = useState({
        visible: false,
    });

    const closeDialogAddCarouselItem = useCallback(() => {
        setDialogAddCarouselItem((prev) => ({ ...prev, visible: false }));
    }, []);

    const itemTemplate = ({ click_link, source }) => (
        <div className="relative w-full">
            <img
                onClick={() => {
                    if (click_link) window.open(click_link, "_blank");
                }}
                width="100%"
                className="border-round-lg shadow-4 block max-h-8rem"
                src={source}
                alt={source}
            />
            <Button className="absolute bottom-0 left-0 m-2" icon="pi pi-trash" rounded outlined severity="danger" aria-label="Cancel" />
        </div>
    );

    return (
        <div className={`flex align-items-center  gap-1 justify-content-center ${className}`}>
            {images?.length ? (
                <Galleria
                    value={images}
                    showThumbnails={false}
                    showIndicators
                    showIndicatorsOnItem={false}
                    indicatorsPosition="bottom"
                    item={itemTemplate}
                    circular
                    autoPlay
                    transitionInterval={3000}
                    pt={{
                        indicators: classNames("p-2 bg-transparent"),
                    }}
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
