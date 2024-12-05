import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestAPI } from "../../../utils/utils";
import { useState } from "react";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";

export default function ProductCard({ product, index, layout }) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState();

    return layout === "grid" ? (
        <div
            className="col-12 sm:col-12 lg:col-6 xl:col-4 p-2 flex flex-wrap align-items-center justify-content-center"
            onClick={() => {
                navigate(`/products/${product.id}`);
            }}
        >
            <Card
                className="w-10 sm:w-full md:w-9 lg:w-full"
                header={
                    <div className="relative w-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-13rem object-cover border-round-top"
                        />

                        <div
                            className="absolute z-1"
                            style={{
                                top: "10px",
                                right: "10px",
                            }}
                        >
                            <div>
                                {product.discount && (
                                    <Tag
                                        value={`${product.discount}% Off`}
                                        severity={"danger"}
                                    ></Tag>
                                )}
                            </div>
                        </div>
                    </div>
                }
                pt={{
                    root: {
                        className: "flex flex-column border-1 border-300",
                        style: {
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            minHeight: "26rem",
                        },
                    },
                    body: classNames("m-0 p-0"),
                    content: classNames("m-0 p-0"),
                }}
            >
                <div
                    className="flex flex-column pt-2 pr-3 pb-4 pl-3 bg-white gap-2 flex-auto"
                    style={{ minHeight: "11rem" }}
                >
                    <h4
                        className="m-0 text-xs sm:text-sm md:text-base lg:text-base font-bold"
                        style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {product.name}
                    </h4>
                    <p className="m-0 text-xs sm:text-sm md:text-base lg:text-base  white-space-nowrap overflow-hidden text-overflow-ellipsis">
                        {product.description}
                    </p>
                    <div className="flex align-items-center flex-row flex-wrap">
                        <span className="font-bold text-xs sm:text-base md:text-base xl:text-lg py-1 mr-2">
                            ₹{product.price}
                        </span>
                        <span className="text-xs sm:text-base md:text-base xl:text-lg py-1 line-through">
                            ₹{product.price}
                        </span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Chip
                            label={product.category}
                            icon="pi pi-tag"
                            className="w-max text-xs"
                        />
                        {product.courses?.length > 1 && (
                            <Chip
                                label={`${product.courses.length} Courses`}
                                className="w-max text-xs"
                            />
                        )}
                    </div>
                </div>
                <div className="pl-3 pr-3 pt-0 pb-3 sm:p-3 mt-auto">
                    <Button
                        icon="pi pi-shopping-cart"
                        severity="info"
                        aria-label="Buy Now"
                        loading={loading}
                        className="w-full p-button p-button-outlined p-button-rounded"
                    >
                        <span className="p-button-icon p-c p-button-icon-left"></span>
                        <span className="p-button-label text-sm md:text-base">
                            Buy Now
                        </span>
                    </Button>
                </div>
            </Card>
        </div>
    ) : (
        <div className="col-12">
            <div
                className={classNames("flex align-items-start p-4 gap-4", {
                    "border-top-1 surface-border": index !== 0,
                })}
            >
                {/* Image Section with Discount Tag */}
                <div className="relative">
                    {product.discount && (
                        <Tag
                            value={`${product.discount}% Off`}
                            severity="danger"
                            className="absolute"
                            style={{
                                top: "10px",
                                left: "10px",
                            }}
                        />
                    )}
                    {product.courses?.length > 1 && (
                        <Tag
                            value={`${product.discount}% Off`}
                            severity="danger"
                            className="absolute"
                            style={{
                                top: "10px",
                                left: "10px",
                            }}
                        />
                    )}

                    <img
                        className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                        src={product.image}
                        alt={product.name}
                    />
                </div>
                {/* Product Details */}
                <div className="flex justify-content-between gap-4">
                    {/* Left Section */}
                    <div className="flex flex-column gap-2">
                        {/* Product Title */}
                        <h4
                            className="text-sm font-bold text-900 m-0"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {product.name}
                        </h4>

                        {/* Description */}
                        <p
                            className="text-xs text-700 m-0"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {product.description}
                        </p>
                        {/* Additional Info */}
                        <div className="text-sm text-700">
                            {product.totalHours} total hours •{" "}
                            {product.lectures} lectures • {product.level}
                        </div>
                        <div className="flex flex-row gap-2">
                            <Chip
                                label={product.category}
                                icon="pi pi-tag"
                                className="w-max text-xs "
                            />
                            {product.courses?.length > 1 && (
                                <Chip
                                    label={`${product.courses.length} Courses`}
                                    className="w-max text-xs"
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-column align-items-center gap-2 h-full justify-content-between flex-grow-1 ">
                        {/* Price */}
                        <div className="flex flex-row align-items-center gap-2 ">
                            <span className="text-lg font-bold text-900">
                                ₹{product.price}
                            </span>
                            <span className="text-sm text-500 line-through">
                                ₹{product.price}
                            </span>
                        </div>
                        <Button
                            icon="pi pi-shopping-cart"
                            severity="info"
                            aria-label="Buy Now"
                            onClick={() =>
                                console.log("Buy Now button clicked!")
                            }
                            loading={loading}
                            className="w-full p-button p-component"
                        >
                            <span className="p-button-icon p-c p-button-icon-left"></span>
                            <span className="p-button-label text-sm md:text-base">
                                Buy Now
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
