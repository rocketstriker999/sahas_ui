import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ButtonPurchase from "../common/ButtonPurchase";

export default function Product({ product, allowBuy = true, showPricing = true }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-3 p-3">
            <img className="border-round m-0 p-0 shadow-4" src={product.image} alt={product.title} />
            <div className="flex-1">
                <p className="font-bold text-sm m-0 p-0">{product.title}</p>
                {showPricing && <p className="m-0 p-0 mt-2 text-sm">Pricing</p>}

                {allowBuy && <ButtonPurchase buttonStyle="mt-2 text-xs" icon={false} productId={product.id} />}

                <Button className="text-xs p-2 mt-2" label="More Details" severity="info" text onClick={() => navigate(`/products/courses/${product.id}`)} />
            </div>
        </div>
    );
}
