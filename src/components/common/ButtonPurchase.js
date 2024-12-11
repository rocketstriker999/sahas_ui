import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function ButtonPurchase({ productId, icon = false, buttonStyle }) {
    const navigate = useNavigate();
    return <Button icon={icon ? "pi pi-shopping-cart" : null} className={ buttonStyle } label="Buy Now" severity="info" raised onClick={() => navigate(`/purchase/${productId}`)} />;
}
