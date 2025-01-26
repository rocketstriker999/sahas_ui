import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import React, { useEffect, useState } from "react";
import { requestAPI } from "../../utils";
import Loading from "../common/Loading";
import { classNames } from "primereact/utils";

export default function CarouselHeader() {
    const [carouselConfig, setCarouselConfig] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: "api/ui-config/carousel",
            onResponseReceieved: (carouselConfig, responseCode) => {
                if (carouselConfig && responseCode === 200) {
                    setCarouselConfig(carouselConfig);
                }
            },
            setLoading: setLoading,
        });
    }, []);

    const itemTemplate = (carouselItem) =>
        carouselItem.type === "image" && <Image width="100%" src={`${process.env.REACT_APP_RESOURCES}${carouselItem.image}`} />;

    if (loading) {
        return <Loading />;
    }

    if (carouselConfig) {
        return (
            <Galleria
                className="shadow-4"
                value={carouselConfig?.carouse_images}
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
}
