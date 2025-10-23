import { Button } from "primereact/button";

export default function ButtonPay({ paymentGateWayPayLoad, disabled, label, icon, className }) {
    return (
        <form action={paymentGateWayPayLoad?.pay > 0 ? paymentGateWayPayLoad?.payuURL : paymentGateWayPayLoad?.successURL} method="post">
            <input type="hidden" name="key" value={paymentGateWayPayLoad?.payuMerchantKey} />
            <input type="hidden" name="txnid" value={paymentGateWayPayLoad?.id} />
            <input type="hidden" name="productinfo" value={paymentGateWayPayLoad?.productTitle} />
            <input type="hidden" name="amount" value={paymentGateWayPayLoad?.pay} />
            <input type="hidden" name="email" value={paymentGateWayPayLoad?.user.email} />
            <input type="hidden" name="firstname" value={paymentGateWayPayLoad?.user.name} />
            <input type="hidden" name="lastname" value={paymentGateWayPayLoad?.user.name} />
            <input type="hidden" name="phone" value={paymentGateWayPayLoad?.user.phone} />
            <input type="hidden" name="surl" value={paymentGateWayPayLoad?.successURL} />
            <input type="hidden" name="furl" value={paymentGateWayPayLoad?.failureURL} />
            <input type="hidden" name="hash" value={paymentGateWayPayLoad?.hash} />

            <Button className={className} icon={icon} label={label} severity="warning" raised disabled={disabled} />
        </form>
    );
}
