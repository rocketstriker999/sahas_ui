import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function ButtonPurchase({ productId }) {
    const navigate = useNavigate();
    return <Button className="mt-2 text-xs p-2" label="Buy Now" severity="info" raised onClick={() => navigate(`/purchase/${productId}`)} />;

}

