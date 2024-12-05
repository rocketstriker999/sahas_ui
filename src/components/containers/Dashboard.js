import { useEffect, useState } from "react";
import ShowCase from "../dashboard/ShowCase";
import Testimonies from "../dashboard/Testimonies";
import Trends from "../dashboard/Trends";
import { requestAPI } from "../../utils/utils";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Loading from "../common/Loading";

export default function Dashboard() {
    const [dashBoardConfig, setDashBoardConfig] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestPath: "ui-config/dashboard",
            setLoading: setLoading,
            onResponseReceieved: (dashBoardConfig, responseCode) => {
                if (dashBoardConfig && responseCode === 200) {
                    setDashBoardConfig(dashBoardConfig);
                }
            },
        });
    }, []);

    if (loading && !dashBoardConfig) {
        return <Loading />;
    }

    if (dashBoardConfig && !loading) {
        return (
            dashBoardConfig && (
                <>
                    {dashBoardConfig.navbar_visible && <Navbar />}
                    {dashBoardConfig.showcase.visible && (
                        <div className="flex justify-content-center">
                            <div className="w-11 sm:w-8 py-6">
                                <ShowCase config={dashBoardConfig.showcase} />
                            </div>
                        </div>
                    )}
                    {dashBoardConfig.trends.visible && (
                        <div className="flex justify-content-center surface-100">
                            <div className="w-11 sm:w-8 py-6">
                                <Trends config={dashBoardConfig.trends} />
                            </div>
                        </div>
                    )}
                    {dashBoardConfig.testimonies.visible && (
                        <div className="flex justify-content-center ">
                            <div className="w-12 sm:w-8 py-6">
                                <Testimonies
                                    config={dashBoardConfig.testimonies}
                                />
                            </div>
                        </div>
                    )}

                    {dashBoardConfig.footer_visible && <Footer />}
                </>
            )
        );
    }
}
