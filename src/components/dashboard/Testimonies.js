import { classNames } from "primereact/utils";
import Testimony from "./Testimony";
import { Carousel } from "primereact/carousel";

export default function Testimonies({ config }) {
    const responsiveOptions = [
        {
            breakpoint: "1400px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "1199px",
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: "767px",
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
            numScroll: 1,
        },
    ];
        const carouselTemplate = (topTestiMonies) => {
            if (topTestiMonies) {
                return (
                    <div className="grid grid-nogutter">
                        <Testimony
                            className="p-2 w-13rem sm:w-full"
                            testimony={topTestiMonies}
                            key={topTestiMonies.testimonyId}
                        />
                    </div>
    
                );
            }
        return (
            <p className="text-color-secondary text-center m-6 font-bold">
                No Content Found !
            </p>
        );
    };

    return (
        <>
            <h1 className="flex justify-content-center font-bold text-800 text-2xl md:text-4xl px-3 sm:px-0">{config.title}</h1>
            <Carousel
                    value={config.testimonies}
                    itemTemplate={carouselTemplate}
                    autoplayInterval={3000}
                    circular
                    numVisible={2}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    pt={{
                        item: classNames("flex justify-content-center"),
                    }}
                />
        </>
    );
}
