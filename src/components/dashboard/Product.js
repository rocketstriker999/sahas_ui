import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ButtonPurchase from "../common/ButtonBuyNow";

export default function Product({ product }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4 p-2">
            <img className="border-round m-0 p-0 shadow-4" src={product.image} alt={product.title} />
            <div className="flex-1">
                <p className="font-bold text-sm m-0 p-0">{product.title}</p>
                {!product.has_access && <p className="m-0 p-0 text-sm">Pricing</p>}

                {!product.has_access && <ButtonPurchase productId={product.id} />}

                <Button className="text-xs p-2" label="More Details" severity="info" text onClick={() => navigate(`/products/${product.id}/courses`)} />
            </div>
        </div>
    );
}
