import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { requestAPI } from "../../utils/utils";

export default function ButtonPurchase({ productId, coupon }) {
    const [priceDetails, setPriceDetails] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestMethod: "POST",
            requestPath: `products/${productId}/price`,
            requestPostBody: { coupon },
            setLoading: setLoading,
            onResponseReceieved: (priceDetails, responseCode) => {
                if (priceDetails && responseCode === 200) {
                    setPriceDetails(priceDetails);
                }
            },
        });
    }, [productId]);

    if (loading && !priceDetails) {
        return <p>Loading for Price Details</p>;
    }

    if (!loading && priceDetails) {
        return (
            <form
                action={priceDetails.payment_gateway.gateway_url}
                method="post"
            >
                <input
                    type="hidden"
                    name="key"
                    value={priceDetails.payment_gateway.merchant_key}
                />
                <input
                    type="hidden"
                    name="txnid"
                    value={priceDetails.payment_gateway.transaction_id}
                />
                <input
                    type="hidden"
                    name="productinfo"
                    value={priceDetails.product_name}
                />
                <input
                    type="hidden"
                    name="amount"
                    value={priceDetails.discounted}
                />
                <input
                    type="hidden"
                    name="email"
                    value={priceDetails.user.email}
                />
                <input
                    type="hidden"
                    name="firstname"
                    value={priceDetails.user.firstname}
                />
                <input
                    type="hidden"
                    name="lastname"
                    value={priceDetails.user.lastname}
                />
                <input
                    type="hidden"
                    name="phone"
                    value={priceDetails.user.phone}
                />
                <input
                    type="hidden"
                    name="surl"
                    value={priceDetails.payment_gateway.success_url}
                />
                <input
                    type="hidden"
                    name="furl"
                    value={priceDetails.payment_gateway.failure_url}
                />
                <input
                    type="hidden"
                    name="hash"
                    value={priceDetails.payment_gateway.hash}
                />

                <Button
                    icon="pi pi-shopping-cart"
                    severity="info"
                    aria-label="Buy Now"
                    loading={loading}
                    className="w-full p-button p-component"
                >
                    <span className="p-button-icon p-c p-button-icon-left"></span>
                    <span className="p-button-label text-sm md:text-base">
                        Buy Now
                    </span>
                </Button>
            </form>
        );
    }
}
