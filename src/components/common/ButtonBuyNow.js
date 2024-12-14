import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function ButtonPurchase({ productId }) {
    const navigate = useNavigate();
    return <Button icon="pi pi-shopping-cart" label="Buy Now" severity="info" raised onClick={() => navigate(`/purchase/${productId}`)} />;
}
