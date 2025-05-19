
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import React from "react";
import NoContent from "../components/common/NoContent";

export default function NewCarouselHeader() {
    const images = [
        { type: "image", image: "https://picsum.photos/id/1005/400/200" },
        { type: "image", image: "https://picsum.photos/id/1035/400/200" },
        { type: "image", image: "https://picsum.photos/id/1040/400/200" },
        { type: "image", image: "https://picsum.photos/id/1045/400/200" }
    ];

    const itemTemplate = (item) =>
        item.type === "image" && (
            <Image
                src={item.image}
                alt="Carousel"
                preview={false}
                imageClassName="w-full border-round-3xl object-contain"
            />
        );

    return images.length ? (
        <div className="p-4 pb-0 flex justify-content-center">
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
                    root: 'w-full',
                    group: 'w-full',
                    indicator: 'mx-1',
                    indicatorButtonActive: 'bg-blue-500',
                }}
            />
        </div>
    ) : (
        <NoContent />
    );
}
