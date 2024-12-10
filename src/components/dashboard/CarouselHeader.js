import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";

export default function CarouselHeader() {
    const itemTemplate = (image) => {
        return <Image width="100%" src={image} />;
    };

    const images = ["https://www.gstatic.com/webp/gallery3/1.png", "https://www.gstatic.com/webp/gallery3/1.png"];

    return (
        <div>
            <p className="w-full lg:w-6 bg-primary text-white font-bold m-0 py-3 px-2 shadow-4">Welcome {true ? "Nisarg" : "To Sahas Smart Studies"}</p>
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
