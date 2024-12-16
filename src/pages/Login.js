import BannerLogin from "../login/BannerLogin";
import FormLogin from "../login/FormLogin";
import Navbar from "../common/Navbar";
import { useEffect, useState } from "react";
import { requestProxy } from "../../utils/utils";
import Footer from "../common/Footer";

export default function Login() {
    const [loginConfig, setLoginConfig] = useState();

    useEffect(() => {
        //hit API Once
        requestProxy({
            requestPath: "/api/ui-config/login",
            onResponseReceieved: (loginConfig, responseCode) => {
                if (loginConfig && responseCode === 200) {
                    setLoginConfig(loginConfig);
                }
            },
        });
    }, []);

    return (
        loginConfig && (
            <>
                {loginConfig.navbar_visible && <Navbar />}
                <div className="flex justify-content-center py-6">
                    <div className="lg:w-8 w-10">
                        <div className="grid grid-nogutter text-800 ">
                            <BannerLogin config={loginConfig.banner_login} />
                            <FormLogin config={loginConfig.form_login} />
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        )
    );
}
