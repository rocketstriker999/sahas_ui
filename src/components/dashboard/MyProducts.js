import { useSelector } from "react-redux";
import { Fragment } from "react";
import Product from "./Product";
import { Divider } from "primereact/divider";
import NoContent from "../common/NoContent";

export default function MyProducts() {
    const myProducts = useSelector((state) => state.stateCatelogue.products?.filter((product) => product.has_access));

    return myProducts?.length > 0 ? (
        <div className="mt-3">
            {myProducts.map((product, index) => (
                <Fragment key={product.id}>
                    {index === 0 && <Divider className="p-0 m-0" />}
                    <Product product={product} />
                    <Divider className="p-0 m-0" />
                </Fragment>
            ))}
        </div>
    ) : (
        <NoContent />
    );
}
