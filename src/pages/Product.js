import { Fragment } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom";
import ButtonPurchase from "../components/common/ButtonBuyNow";
import { Button } from "primereact/button";
import NoContent from "../components/common/NoContent";
import { getResource } from "../utils";
import { useAppContext } from "../providers/ProviderAppContainer";

export default function Product() {
    const { catelogue } = useAppContext();

    const { productId } = useParams();
    const product = catelogue?.products?.find((product) => product.id == productId);

    return product ? (
        <Fragment>
            <div className="bg-primary p-3 shadow-4">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <h1 className="text-white font-bold m-0 mt-4 lg:text-2xl text-base">{product?.title}</h1>
                        <p className="lg:text-base text-xs text-white m-0 mt-3 line-height-3">{product?.description}</p>
                    </div>
                    <div>
                        <img
                            className="border-round m-0 p-0 shadow-4"
                            width="100"
                            height="100"
                            src={getResource(product?.image)}
                            alt={process.env.REACT_APP_FALLBACK_IMAGE}
                        />
                    </div>
                </div>
                <div className="flex gap-2 mt-3 justify-content-end">
                    {product?.whatsapp_group && product?.access && (
                        <Button
                            icon="pi pi-whatsapp"
                            label="WhatsApp"
                            className="p-button-success text-xs p-2"
                            onClick={() => window.open(`https://chat.whatsapp.com/${product.whatsapp_group}`, "_blank")}
                        />
                    )}
                    {product?.access ? <Button label="Receipt" severity="info" raised /> : <ButtonPurchase productId={productId} />}
                </div>
            </div>
            <Outlet />
        </Fragment>
    ) : (
        <NoContent error="This Product is Not Available !" />
    );
}
