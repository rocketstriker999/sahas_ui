import { useEffect, useState } from "react";
import { requestAPI } from "../../utils/utils";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ContentSections from "../demo/ContentSections";
import { useParams } from "react-router-dom";
import ButtonPurchase from "../common/ButtonPurchase";
import SkeletonContainer from "../common/Skeletons/Container";
import { Card } from 'primereact/card';
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";

export default function Demo() {
    const [demoConfig, setDemoConfig] = useState();
    const [loading, setLoading] = useState();
    const { id } = useParams();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestPath: "ui-config/demo",
            setLoading: setLoading,
            onResponseReceieved: (demoConfig, responseCode) => {
                if (demoConfig && responseCode === 200) {
                    setDemoConfig(demoConfig);
                }
            },
        });
    }, []);

    if (loading && !demoConfig) {
        return <SkeletonContainer />;
    }
    if (demoConfig && !loading) {
        return (
            demoConfig && (
                <>
                    {demoConfig.navbar_visible && <Navbar />}

                    <div className="flex md:flex-row flex-column justify-content-center align-items-top py-4 gap-4">
                        {demoConfig.content_sections?.visible && (
                            <div className="w-12 md:w-7">
                                <ContentSections config={demoConfig.content_sections} productId={id} />
                            </div>
                        )}
                        {demoConfig.purchase?.visible && (
                            <div className="flex justify-content-center w-full md:w-3">
                                <Card
                                    className="w-full shadow-2 p-4 border-round"
                                    title="Product Details"
                                    pt={{
                                        title:classNames("text-base md:text-lg m-0"),
                                        body:classNames("px-4 py-0"),
                                        content:classNames("p-0"),
                                    }}
                                >
                                    <div className="flex flex-column">
                                        <Divider />
                                        <div className="mb-3">
                                            <div className="flex justify-content-between">
                                                <span className="font-bold text-sm md:text-base">Original Price:</span>
                                                <span className="text-line-through text-sm">2200</span>
                                            </div>
                                            <div className="flex justify-content-between mt-2">
                                                <span className="font-bold text-sm md:text-base">Discounted Price:</span>
                                                <span className="text-success text-sm">2000</span>
                                            </div>
                                            <div className="flex justify-content-between mt-2">
                                                <span className="font-bold text-sm md:text-base">Discount Amount:</span>
                                                <span className="text-danger text-sm">- 200</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-content-between mt-3">
                                            <span className="font-bold text-sm md:text-base">Total Price:</span>
                                            <span className="font-bold text-base md:text-lg text-primary">1800</span>
                                        </div>
                                        <div className="mt-3">
                                            <ButtonPurchase productId={id} />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            // <div className="w-12 md:w-2">
                            //     <ButtonPurchase productId={id} />
                            // </div>
                        )}
                    </div>

                    {demoConfig.footer_visible && <Footer />}
                </>
            )
        );
    }
}
