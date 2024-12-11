import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { requestAPI } from "../";
import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router-dom";

export default function ButtonPurchase() {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState();
    const { productId } = useParams();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestPath: `products/${productId}/price`,
            setLoading: setLoading,
            onResponseReceieved: (product, responseCode) => {
                if (product && responseCode === 200) {
                    setProduct(product);
                }
            },
        });
    }, [productId]);

    if (loading && !product) {
        return <ProgressSpinner />;
    }

    //transcation 1 , prod 1 , 100 , in-progress //hash

    //apply coupon -  1 , update price 90 . in progress //hash

    if (!loading && product) {
        return (
            <form action={product.payment_gateway.gateway_url} method="post">
                <input type="hidden" name="key" value={product.payment_gateway.merchant_key} />
                <input type="hidden" name="txnid" value={product.payment_gateway.transaction_id} />
                <input type="hidden" name="productinfo" value={product.product_name} />
                <input type="hidden" name="amount" value={product.discounted} />
                <input type="hidden" name="email" value={product.user.email} />
                <input type="hidden" name="firstname" value={product.user.firstname} />
                <input type="hidden" name="lastname" value={product.user.lastname} />
                <input type="hidden" name="phone" value={product.user.phone} />
                <input type="hidden" name="surl" value={product.payment_gateway.success_url} />
                <input type="hidden" name="furl" value={product.payment_gateway.failure_url} />
                <input type="hidden" name="hash" value={product.payment_gateway.hash} />

                <Button icon="pi pi-shopping-cart" label="Buy Now" severity="info" raised loading={loading} />
            </form>
        );
    }
}
