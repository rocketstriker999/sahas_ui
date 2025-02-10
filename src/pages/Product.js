import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { requestProxy } from "../utils";
import { Outlet } from "react-router-dom";
import ButtonPurchase from "../components/common/ButtonBuyNow";
import { Button } from "primereact/button";
import Loading from "../components/common/Loading";

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState();
    useEffect(() => {
        requestProxy({
            requestPath: `/api/products/${productId}`,
            onResponseReceieved: (product, responseCode) => {
                if (product && responseCode === 200) {
                    setProduct(product);
                }
            },
            setLoading: setLoading,
        });
    }, [productId]);

    if (loading) {
        return <Loading />;
    }

    if (product && !loading) {
        return (
            <Fragment>
                <div className="bg-primary flex p-3 gap-2 shadow-4">
                    <div className="flex-1">
                        <h1 className="text-white font-bold m-0 mt-4 lg:text-3xl text-base">{product?.title}</h1>
                        <p className="lg:text-base text-xs text-white m-0 mt-3 line-height-3">{product?.description}</p>
                    </div>
                    <div className="flex flex-column gap-3">
                        <img
                            className="border-round m-0 p-0 shadow-4"
                            width="100"
                            height="100"
                            src={`${process.env.REACT_APP_IMAGES_PUBLIC}${product.image}`}
                            alt="Product"
                        />
                        {product.access ? <Button label="Receipt" severity="info" raised /> : <ButtonPurchase productId={productId} />}
                    </div>
                </div>
                <Outlet />
            </Fragment>
        );
    }
}
