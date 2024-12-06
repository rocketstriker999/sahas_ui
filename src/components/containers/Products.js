import React, { useState, useEffect, Fragment } from "react";
import { requestAPI } from "../../utils/utils";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ProductsList from "../products/list/ProductsList";
import ProductsSearch from "../products/ProductsSearch";
import { useParams } from "react-router-dom";
import SkeletonContainer from "../common/Skeletons/Container";

export default function Products() {
    const [productsConfig, setProductsConfig] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const { query, category } = useParams();
    console.log(query);
    console.log(category);

    useEffect(() => {
        requestAPI({
            requestPath: "ui-config/products",
            onResponseReceieved: (productsConfig, responseCode) => {
                if (productsConfig && responseCode === 200) {
                    setProductsConfig(productsConfig);
                }
            },
            setLoading: setLoading,
            onRequestFailure: setError,
        });
    }, []);

    if (loading) {
        return <SkeletonContainer />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (productsConfig && !loading) {
        return (
            <Fragment>
                {productsConfig?.navbar_visible && <Navbar />}
                <div className="w-full md:w-8 py-4 mx-auto">
                    {productsConfig?.products_search.visible && (
                        <ProductsSearch
                            config={productsConfig?.products_search}
                        />
                    )}
                    {productsConfig?.products_search.visible && (
                        <ProductsList config={productsConfig?.products_list} />
                    )}
                </div>

                {productsConfig?.footer_visible && <Footer />}
            </Fragment>
        );
    }
}
