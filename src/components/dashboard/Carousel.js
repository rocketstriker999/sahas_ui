import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { classNames } from "primereact/utils";
import NoContent from "../common/NoContent";
import { getResource } from "../../utils";

export default function Carousel({ images }) {
    const itemTemplate = (carouselItem) => (
        <div className="border-round-lg shadow-4 overflow-hidden  h-8rem">
            <Image width="100%" className="block" src={getResource(carouselItem?.image)} alt={carouselItem?.image} />
        </div>
    );

    if (images?.length) {
        return (
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
        );
    }
    return <NoContent />;
}
