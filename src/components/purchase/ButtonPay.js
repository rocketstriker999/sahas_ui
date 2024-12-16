import { Button } from "primereact/button";

export default function ButtonPay({ transaction, disabled }) {
    return (
        <form action={transaction.payment_gateway.gateway_url} method="post">
            <input type="hidden" name="key" value={transaction.payment_gateway.merchant_key} />
            <input type="hidden" name="txnid" value={transaction.payment_gateway.transaction_id} />
            <input type="hidden" name="productinfo" value={transaction.product.title} />
            <input type="hidden" name="amount" value={transaction.product.pay} />
            <input type="hidden" name="email" value={transaction.user.email} />
            <input type="hidden" name="firstname" value={transaction.user.name} />
            <input type="hidden" name="lastname" value={transaction.user.name} />
            <input type="hidden" name="phone" value={transaction.user.phone} />
            <input type="hidden" name="surl" value={transaction.payment_gateway.success_url} />
            <input type="hidden" name="furl" value={transaction.payment_gateway.failure_url} />
            <input type="hidden" name="hash" value={transaction.payment_gateway.hash} />

            <Button icon="pi pi-shopping-cart" label="Pay Now" severity="info" raised disabled={disabled} />
        </form>
    );
}
