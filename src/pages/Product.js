import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import React from "react";
import Footer from "../common/Footer";
import { requestAPI } from "../../utils/utils";
import ProductPrimary from "../product/ProductPrimary/ProductPrimary";
import ProductSecondary from "../product/ProductSecondary";
import SkeletonContainer from "../common/Skeletons/Container";

export default function Product() {
    const { id } = useParams();

    const [productConfig, setProductConfig] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: "ui-config/product",
            onResponseReceieved: (productConfig, responseCode) => {
                if (productConfig && responseCode === 200) {
                    setProductConfig(productConfig);
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

    if (productConfig && !loading) {
        return (
            <Fragment>
                {productConfig.navbar_visible && <Navbar />}

                <div className="flex flex-column  align-items-center gap-3">
                    {productConfig.product_primary.visible && (
                        <div
                            className={`w-12 flex justify-content-center ${productConfig.product_primary.background_color}`}
                        >
                            <div className="w-10 py-4 flex flex-column md:flex-row text-white gap-4">
                                <ProductPrimary
                                    config={productConfig.product_primary}
                                    courseId={id}
                                />
                            </div>
                        </div>
                    )}

                    {productConfig.product_secondary.visible && (
                        <div className="w-11 md:w-8">
                            {
                                <ProductSecondary
                                    config={productConfig.product_secondary}
                                    courseId={id}
                                />
                            }
                        </div>
                    )}
                </div>

                {productConfig.footer_visible && <Footer />}
            </Fragment>
        );
    }
}
