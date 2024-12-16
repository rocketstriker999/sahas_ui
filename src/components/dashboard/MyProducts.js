import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { requestProxy } from "../../utils";
import { ProgressSpinner } from "primereact/progressspinner";
import Product from "./Product";
import { Divider } from "primereact/divider";
import NoContent from "../common/NoContent";

export default function MyProducts() {
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const [userProducts, setUserProducts] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestProxy({
            requestPath: `/api/products/mine`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (userProducts, responseCode) => {
                if (userProducts && responseCode === 200) {
                    setUserProducts(userProducts);
                } else {
                    throw new Error(userProducts.error);
                }
            },
        });
    }, [loggedInUser]);

    if (loading) {
        return <ProgressSpinner />;
    }

    if (userProducts && userProducts.length > 0) {
        return (
            <div className="mt-3">
                {userProducts.map((product, index) => (
                    <Fragment>
                        {index === 0 && <Divider className="p-0 m-0" />}
                        <Product product={{ ...product, has_access: true }} />
                        <Divider className="p-0 m-0" />
                    </Fragment>
                ))}
            </div>
        );
    } else {
        return <NoContent />;
    }
}
