import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ButtonPurchase from "../common/ButtonBuyNow";
import { getMedia } from "../../utils";
import { Ripple } from "primereact/ripple";

export default function Product({ product }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-3 p-3 align-items-start relative overflow-hidden" onClick={() => navigate(`/products/${product.id}`)}>
            <Ripple
                pt={{
                    root: { style: { background: "rgba(102, 189, 240, 0.4)" } },
                }}
            />
            <img className="border-round shadow-4" width="100" height="100" src={getMedia(product.image)} alt={product.image} />
            <div className="flex flex-column gap-2 w-full">
                <span className="font-bold text-sm text-left">{product.title}</span>
                {!product.has_access && (
                    <div className="text-left">
                        <span className="text-sm font-bold text-900 mr-2">{product.discounted} Rs.</span>
                        <span className="text-xs text-500 line-through">{product.price} Rs.</span>
                    </div>
                )}
                <div className="flex gap-2">
                    {!product.has_access && <ButtonPurchase productId={product.id} onClick={(e) => e.stopPropagation()} />}
                    <Button
                        className="text-xs p-2"
                        label="More Details"
                        severity="info"
                        text
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent div click event
                            navigate(`/products/${product.id}`); // Redirect to More Details
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
