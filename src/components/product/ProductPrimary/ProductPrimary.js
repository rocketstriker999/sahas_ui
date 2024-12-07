import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";
import coursePrimaryStyle from "./product_primary.module.css";
import { useEffect, useState } from "react";
import { requestAPI } from "../../../utils/utils";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ButtonPurchase from "../../common/ButtonPurchase";

export default function CoursePrimary({ config, courseId }) {
    const [coursePrimaryDetails, setCoursePrimaryDetails] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();

    const items = [
        { label: "Courses", url: "/products" },
        {
            label: coursePrimaryDetails?.category,
            url: `/products/category/${coursePrimaryDetails?.category}`,
        },
    ];
    const home = { icon: "pi pi-home", url: "/" };

    useEffect(() => {
        requestAPI({
            requestPath: `products/${courseId}/primary-details`,
            onResponseReceieved: (coursePrimaryDetails, responseCode) => {
                if (coursePrimaryDetails && responseCode === 200) {
                    setCoursePrimaryDetails(coursePrimaryDetails);
                }
            },
            setLoading: setLoading,
            onRequestFailure: setError,
        });
    }, [courseId]);

    if (loading) {
        return <p>Loading Course Primary Details</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (coursePrimaryDetails && !loading)
        return (
            <>
                <div className="md:w-8 w-full gap-3 flex-grow-1 p-3 md:p-4">
                    <BreadCrumb
                        model={items}
                        home={home}
                        pt={{
                            root: {
                                className: classNames(
                                    `${coursePrimaryStyle.breadcrumb} p-1`
                                ),
                            },
                            separatorIcon: {
                                className: classNames(
                                    "text-blue-400 font-bold"
                                ),
                                style: { width: "10", height: "10" },
                            },
                            icon: {
                                className: classNames(
                                    "text-xs md:text-sm font-semibold text-blue-400"
                                ),
                            },
                            label: {
                                className: classNames(
                                    "text-xs md:text-sm font-semibold text-blue-400"
                                ),
                            },
                        }}
                    />
                    <h1 className="text-white font-bold m-0 mt-4 lg:text-3xl text-base">
                        {coursePrimaryDetails?.title}
                    </h1>
                    <p className="lg:text-base text-xs text-white m-0 mt-3 line-height-3">
                        {coursePrimaryDetails?.description}
                    </p>

                    <span className="flex align-items-center gap-2 text-white mt-3">
                        <i className="pi pi-globe text-xs md:text-sm"></i>
                        <span className="text-xs md:text-sm">
                            {coursePrimaryDetails?.language}
                        </span>
                    </span>

                    <div class="grid md:px-3 px-0 mt-3">
                        {coursePrimaryDetails.key_points.map((keyPoint) => (
                            <div class="col-6 flex gap-3 align-items-top justify-content-start">
                                <i className="pi pi-check text-sm mt-2 text-green-500 font-bold"></i>
                                <span className="line-height-3 lg:text-base text-xs">
                                    {keyPoint}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:w-4 w-full flex gap-2 flex-column p-3 md:p-4 pt-0 md:pt-4">
                    <img
                        className="border-solid border-1 rounded-lg shadow-lg md:w-full md:h-auto h-10rem"
                        src={coursePrimaryDetails?.hero.image}
                        alt="Product"
                    />

                    {/* <div className="flex gap-2 align-items-center mt-3 text-white">
                        <span className="font-bold text-lg md:text3xl">
                            ₹{coursePrimaryDetails?.price?.discounted}
                        </span>
                        <span className="line-through text-xs md:text-sm font-light">
                            ₹{coursePrimaryDetails.price.original}
                        </span>
                        <span className="text-xs md:text-sm font-bold text-green-500">
                            {coursePrimaryDetails?.price?.discount}% Off
                        </span>
                    </div> */}

                    <div className="flex mt-3 gap-2 md:flex-column justify-content-between lg:flex-row sm:flex-row">
                        <ButtonPurchase productId={coursePrimaryDetails.product_id} />
                        <Button
                            icon="pi pi-play"
                            severity="info"
                            aria-label="View Demo"
                            loading={loading}
                            className="p-button p-component"
                            onClick={() => navigate("demo")}
                        >
                            <span className="p-button-icon p-c p-button-icon-left text-xs md:text-base"></span>
                            <span className="p-button-label text-xs md:text-base">
                            View Demo
                            </span>
                        </Button>
                        {/* <Button
                            onClick={() => navigate("demo")}
                            className="lg:text-base md:text-sm text-xs p-button p-button-rounded p-button-outlined flex-1"
                            icon="pi pi-desktop"
                            label="View Demo"
                        ></Button> */}
                    </div>
                </div>
            </>
        );
}
