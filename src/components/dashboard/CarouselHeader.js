import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";

export default function CarouselHeader({ config }) {
    const itemTemplate = (image) => {
        return <Image width="100%" src={image} />;
    };

    const images = [
        "https://www.gstatic.com/webp/gallery3/1.png",
        "https://www.gstatic.com/webp/gallery3/2.png",
        "https://www.gstatic.com/webp/gallery3/3.png",
    ];

    return (
        <div>
            <p className="w-full lg:w-6 bg-primary text-white p-2">Wlecome To Sahas Smart Studeis</p>
            <Galleria
                className="w-full lg:w-6"
                value={images}
                style={{ maxWidth: "450px" }}
                showThumbnails={false}
                showIndicators
                showIndicatorsOnItem={true}
                indicatorsPosition="bottom"
                item={itemTemplate}
                circular
                autoPlay
                transitionInterval={2000}
            />
        </div>
    );
}
