import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import { Galleria } from "primereact/galleria";

export default function Trends({ config }) {
    const itemTemplate = (image) => {
        return (
            <Image width="100%" src={image} />
        );
    };
    return (
        <div className="grid grid-nogutter align-items-center lg:flex-nowrap gap-5">
            <div className="col-12 lg:col-6">
                <div>
                    <h1 className="font-bold text-800 m-0 text-2xl md:text-4xl">{config.title}</h1>
                    <p className="text-base md:text-lg line-height-3 text-800">{config.tagline}</p>
                    <Button label="See Updates" type="button" className="p-button-outlined" />
                </div>
            </div>
            <div className="col-12 lg:col-6 lg:mt-0">
                <Galleria
                    value={config.images}
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

        </div>)


}