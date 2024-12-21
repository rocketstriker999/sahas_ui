import { Button } from "primereact/button";

export default function ButtonPay({ transaction, disabled }) {
    return (
        <form action={transaction.payuURL} method="post">
            <input type="hidden" name="key" value={transaction.payuMerchantKey} />
            <input type="hidden" name="txnid" value={transaction.id} />
            <input type="hidden" name="productinfo" value={transaction.productTitle} />
            <input type="hidden" name="amount" value={transaction.pay} />
            <input type="hidden" name="email" value={transaction.user.email} />
            <input type="hidden" name="firstname" value={transaction.user.name} />
            <input type="hidden" name="lastname" value={transaction.user.name} />
            <input type="hidden" name="phone" value={transaction.user.phone} />
            <input type="hidden" name="surl" value={transaction.successURL} />
            <input type="hidden" name="furl" value={transaction.failureURL} />
            <input type="hidden" name="hash" value={transaction.hash} />

            <Button className="w-full" icon="pi pi-shopping-cart" label="Pay Now" severity="info" raised disabled={disabled} />
        </form>
    );
}
