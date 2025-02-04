import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import React from "react";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import NoContent from "../common/NoContent";
import { getResource } from "../../utils";

export default function CarouselHeader() {
    const carouselImages = useSelector((state) => state.stateTemplate.carousel?.images);

    const itemTemplate = (carouselItem) =>
        carouselItem.type === "image" && <Image width="100%" src={getResource(carouselItem?.image)} alt={process.env.REACT_APP_FALLBACK_IMAGE} />;

    if (carouselImages && carouselImages.length > 0) {
        return (
            <Galleria
                className="shadow-4"
                value={carouselImages}
                showThumbnails={false}
                showIndicators
                showIndicatorsOnItem={true}
                indicatorsPosition="bottom"
                item={itemTemplate}
                circular
                autoPlay
                transitionInterval={2000}
                pt={{
                    indicators: classNames("p-2 bg-transparent"),
                }}
            />
        );
    }
    return <NoContent />;
}
