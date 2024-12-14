import { useEffect, useState } from "react";
import { requestAPI } from "../utils";
import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router-dom";
import ButtonPay from "../components/purchase/ButtonPay";

export default function Purchase() {
    const [transaction, setTransaction] = useState();
    const [loading, setLoading] = useState();
    const { productId } = useParams();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestPath: `transactions/${productId}`,
            setLoading: setLoading,
            onResponseReceieved: (transaction, responseCode) => {
                if (transaction && responseCode === 200) {
                    setTransaction(transaction);
                }
            },
        });
    }, [productId]);

    const applyCouponCode = () => {};

    if (loading) {
        return <ProgressSpinner />;
    }

    if (!loading && transaction) {
        return <ButtonPay transaction={transaction} disable={loading} />;
    }
}
