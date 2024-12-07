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
import ButtonPurchase from "../../common/ButtonPurchase";

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
                            className="w-full max-w-6rem h-6rem max-h-6rem object-cover border-round"
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
                    <ButtonPurchase productId={product.id} />
                </div>
            </Card>
        </div>
    ) : (
        <div className="col-12">
            <div className={classNames("grid grid-nogutter py-4 gap-4", { "border-top-1 surface-border": index !== 0, })}
                onClick={() => {
                    navigate(`/products/${product.id}`);
                }} >
                {/* Image Section with Discount Tag   20% flex*/}
                <div className="col-4">
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
                                pt={{
                                    value: {
                                        style: {
                                            fontSize: classNames("text-xs"),
                                        },
                                    },
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
                                pt={{
                                    value: {
                                        style: {
                                            fontSize: classNames("text-xs"),
                                        },
                                    },
                                }}
                            />
                        )}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-7rem md:h-12rem object-cover border-round"
                        />
                    </div>
                </div>
                {/* Content and Button column  total width 80% flex and for flex column mobile and laptop flex row*/}
                <div className="flex col flex-wrap gap-2" >
                    {/* Content column for both mobile and laptop*/}
                    <div className="flex flex-1 flex-column gap-2">
                        <h4 className="text-sm md:text-base font-bold text-900 m-0">{product.name}</h4>
                        {/* Description */}
                        <p
                            className="text-xs md:text-sm text-700 m-0 hidden md:inline"
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
                        <div className="text-xs md:text-sm text-700 hidden md:inline">
                            • {product.totalHours} total hours{" "}
                            • {product.lectures} lectures{product.level}
                        </div>
                        <div className="flex gap-2">
                            <Chip
                                label={product.category}
                                icon="pi pi-tag"
                                className="w-max text-xs md:text-sm"
                                pt={{
                                    icon: classNames("text-xs md:text-sm my-1"),
                                    label: classNames("text-xs md:text-sm my-1")
                                }}

                            />
                            {product.courses?.length > 1 && (
                                <Chip
                                    label={`${product.courses.length} Courses`}
                                    className="w-max text-xs md:text-sm"
                                    pt={{
                                        icon: classNames("text-xs md:text-sm my-1"),
                                        label: classNames("text-xs md:text-sm my-1")
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-column align-items-center gap-2">
                        {/* Price Section */}
                        <div className="flex align-items-center gap-1">
                            <span className="text-base md:text-lg font-bold text-900">₹{product.price}</span>
                            <span className="text-sm md:text-sm text-500 line-through">₹{product.price}</span>
                        </div>
                        <ButtonPurchase productId={product.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
