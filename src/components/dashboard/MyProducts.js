import { Fragment } from "react";
import Product from "./Product";
import { Divider } from "primereact/divider";
import NoContent from "../common/NoContent";
import { useAppContext } from "../../providers/ProviderApp";

export default function MyProducts() {
    const { catelogue } = useAppContext();

    const myProducts = catelogue?.products?.filter((product) => product.has_access);

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
