import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CarouselHeader({ config }) {
    const currentLoggedInUser = useSelector((state) => state.stateUser.user);

    const navigate = useNavigate();

    const responsiveOptions = [
        {
            breakpoint: "1400px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "1199px",
            numVisible: 2,
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

    const carouselTemplate = (category) => {
        return (
            <div
                className="m-2"
                onClick={() => navigate(`/products/category/${category.name}`)}
            >
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full shadow-2 border-round"
                />
            </div>
        );
    };

    return (
        <div className="grid grid-nogutter text-800 ">
            <div className="col-12 lg:col-6 mb-4 lg:mb-0 text-center lg:text-left flex justify-content-center align-items-center">
                <section>
                    <span className="text-4xl md:text-6xl font-bold">
                        {config.title}
                    </span>
                    <div className="text-4xl md:text-6xl text-primary font-bold mb-2">
                        {config.tagline}
                    </div>
                    <p className="mt-0 mb-4 md:text-xl text-700 line-height-3">
                        {config.description}
                    </p>
                    <div className="flex flex-wrap gap-3 justify-content-center lg:justify-content-start">
                        <Button
                            label="All Courses"
                            type="button"
                            className="md:mr-3 md:mb-0 p-button-raised"
                            onClick={() => navigate("/products")}
                        />
                        {!currentLoggedInUser ? (
                            <Button
                                onClick={() => navigate("/login")}
                                label="Login"
                                type="button"
                                className="p-button-outlined"
                            />
                        ) : (
                            <Button
                                onClick={() => navigate("/products/mine")}
                                label="My Learning"
                                type="button"
                                className="p-button-outlined"
                            />
                        )}
                    </div>
                </section>
            </div>
            <div className="col-12 lg:col-6 overflow-hidden flex align-items-center justify-content-center">
                <Carousel
                    autoplayInterval={3000}
                    circular
                    value={config.product_categories}
                    numScroll={1}
                    numVisible={3}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={carouselTemplate}
                />
            </div>
        </div>
    );
}
