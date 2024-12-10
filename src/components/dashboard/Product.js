import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4 p-2">
            <img className="border-round m-0 p-0 shadow-4" src={product.image} alt={product.name} />
            <div className="flex-1">
                <p className="font-bold text-sm m-0 p-0">{product.name}</p>
                <p className="m-0 p-0 text-sm">Pricing</p>
                <Button className="text-xs p-2" label="Buy Now" severity="info" raised />
                <Button className="text-xs p-2" label="More Details" severity="info" text onClick={() => navigate(`/products/courses/${product.id}`)} />
            </div>
        </div>
    );
}
