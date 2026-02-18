import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function ButtonPay({ paymentGateWay, transaction, user, product, disabled, icon, className }) {
    const navigate = useNavigate();

    if (transaction?.amount > 0) {
        return (
            <form action={paymentGateWay?.url} method="post">
                <input type="hidden" name="key" value={paymentGateWay?.merchantKey} />
                <input type="hidden" name="txnid" value={transaction?.id} />
                <input type="hidden" name="productinfo" value={product} />
                <input type="hidden" name="email" value={user?.email} />
                <input type="hidden" name="firstname" value={user?.firstName} />
                <input type="hidden" name="lastname" value={user?.lastName} />
                <input type="hidden" name="phone" value={user?.phone} />
                <input type="hidden" name="surl" value={transaction?.successURL} />
                <input type="hidden" name="furl" value={transaction?.failureURL} />
                <input type="hidden" name="amount" value={transaction?.amount} />
                <input type="hidden" name="hash" value={transaction?.hash} />

                <Button className={className} icon={icon} label={"Continue To Pay"} severity="warning" raised disabled={disabled} />
            </form>
        );
    }

    //free course kind of things
    return (
        <Button
            className={className}
            icon={icon}
            label={"Actiavte For Free !"}
            severity="success"
            raised
            disabled={disabled}
            onClick={() => {
                navigate(`/payment-gateway-payloads/${transaction?.id}`);
            }}
        />
    );
}
