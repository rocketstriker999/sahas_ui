import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import React from "react";
import { classNames } from "primereact/utils";
import NoContent from "../common/NoContent";
import { getResource } from "../../utils";
import { useAppContext } from "../../providers/ProviderSahas";

export default function CarouselHeader() {
    const { templateConfig } = useAppContext();

    const itemTemplate = (carouselItem) =>
        carouselItem.type === "image" && <Image width="100%" src={getResource(carouselItem?.image)} alt={process.env.REACT_APP_FALLBACK_IMAGE} />;

    if (templateConfig?.carousel?.images && templateConfig?.carousel?.images?.length) {
        return (
            <Galleria
                className="shadow-4"
                value={templateConfig?.carousel?.images}
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
