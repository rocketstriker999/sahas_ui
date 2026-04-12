import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { TEXT_BADGE } from "../../style";

export default function ButtonPurchase({ productId, onClick }) {
    const navigate = useNavigate();
    return <Button className={`${TEXT_BADGE} p-2`} label="Buy Now" severity="info" raised 
    onClick={(e) => {
        onClick?.(e);  // Stop propagation if provided
        navigate(`/purchase/${productId}`);  // Navigate to purchase
    }} />;
}

