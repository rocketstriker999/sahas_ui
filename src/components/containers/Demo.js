import { useEffect, useState } from "react";
import { requestAPI } from "../../utils/utils";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ContentSections from "../demo/ContentSections";
import { useParams } from "react-router-dom";
import ButtonPurchase from "../common/ButtonPurchase";
import SkeletonContainer from "../common/Skeletons/Container";

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

                    <div className="flex justify-content-center align-items-top py-4 gap-4">
                        {demoConfig.content_sections?.visible && (
                            <div className="w-6">
                                <ContentSections config={demoConfig.content_sections} productId={id} />
                            </div>
                        )}
                        {demoConfig.purchase?.visible && (
                            <div className="w-2 ">
                                <ButtonPurchase productId={id} />
                            </div>
                        )}
                    </div>

                    {demoConfig.footer_visible && <Footer />}
                </>
            )
        );
    }
}
