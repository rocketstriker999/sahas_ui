import { useEffect, useState } from "react";
import { requestAPI } from "../../utils/utils";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ContentSections from "../demo/ContentSections";
import { useParams } from "react-router-dom";
import ButtonPurchase from "../common/ButtonPurchase";
import SkeletonContainer from "../common/Skeletons/Container";
import { Card } from 'primereact/card';

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
                            <div className="w-12 md:w-8">
                                <ContentSections config={demoConfig.content_sections} productId={id} />
                            </div>
                        )}
                        {demoConfig.purchase?.visible && (
                            <div className="flex justify-content-center">
                            <Card 
                                className="w-8 md:w-12" 
                                title="Product Details" 
                                
                            >
                                <div className="flex flex-column align-items-center">
                                    <div className="mb-2">
                                        <div className="flex justify-content-between">
                                            <span className="font-bold">Original Price:</span>
                                            <span className="text-line-through">2200</span>
                                        </div>
                                        <div className="flex justify-content-between">
                                            <span className="font-bold">Discounted Price:</span>
                                            <span className="text-success">200</span>
                                        </div>
                                        <div className="flex justify-content-between">
                                            <span className="font-bold">Discount Amount:</span>
                                            <span className="text-danger">200</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-content-between mt-2">
                                        <span className="font-bold">Total Price:</span>
                                        <span className="font-bold text-xl">2000</span>
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
