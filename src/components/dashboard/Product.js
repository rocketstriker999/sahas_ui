import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ButtonPurchase from "../common/ButtonBuyNow";

export default function Product({ product }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-3 p-3 justify-content-start align-items-center">
            <img className="border-round m-0 p-0 shadow-4" width="100" src={`${process.env.REACT_APP_IMAGES_PUBLIC}${product.image}`} alt={product.title} />
            <div className="flex-1">
                <span className="font-bold text-sm m-0 p-0">{product.title}</span>
                {!product.has_access && (
                    <p className="m-0 p-0 mt-2 text-sm">
                        <span className="text-sm font-bold text-900 mr-2">{product.discounted} Rs.</span>
                        <span className="text-xs text-500 line-through">{product.price} Rs.</span>
                    </p>
                )}

                {!product.has_access && <ButtonPurchase productId={product.id} />}

                <Button className="text-xs p-2" label="More Details" severity="info" text onClick={() => navigate(`/products/${product.id}/courses`)} />
            </div>
        </div>
    );
}
