import { Button } from "primereact/button";

export default function ButtonPay({ paymentGateWay, transcation, user, product, disabled, label, icon, className }) {
    return (
        <form action={paymentGateWay?.url} method="post">
            <input type="hidden" name="key" value={paymentGateWay?.merchantKey} />
            <input type="hidden" name="txnid" value={transcation?.id} />
            <input type="hidden" name="productinfo" value={product} />
            <input type="hidden" name="email" value={user?.email} />
            <input type="hidden" name="firstname" value={user?.firstName} />
            <input type="hidden" name="lastname" value={user?.lastName} />
            <input type="hidden" name="phone" value={user?.phone} />
            <input type="hidden" name="surl" value={transcation?.successURL} />
            <input type="hidden" name="furl" value={transcation?.failureURL} />
            <input type="hidden" name="amount" value={transcation?.amount} />
            <input type="hidden" name="hash" value={transcation?.hash} />

            <Button className={className} icon={icon} label={label} severity="warning" raised disabled={disabled} />
        </form>
    );
}
