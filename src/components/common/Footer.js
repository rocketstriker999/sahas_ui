import React, { useEffect, useState } from "react";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { requestAPI } from "../../utils/utils";
import { Divider } from "primereact/divider";
import FooterSkeleton from "./Skeletons/FooterSkeleton";

export default function Footer() {
    const navigate = useNavigate();
    const [footerConfig, setFooterConfig] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        //hit API Once
        requestAPI({
            requestPath: "api/ui-config/footer",
            setLoading: setLoading,
            onResponseReceieved: (footerConfig, responseCode) => {
                if (footerConfig && responseCode === 200) {
                    setFooterConfig(footerConfig);
                }
            },
        });
    }, []);

    if (loading && !footerConfig) {
        return <FooterSkeleton />;
    }

    if (!loading && footerConfig) {
        return (
            <div className={`text-white ${footerConfig.background_color}`}>
                <div className="p-4 font-bold text-base md:text-xl">
                    <span>{footerConfig.title}</span>
                </div>
                <Divider className="m-0 w-auto mx-4" />
                <div className="flex flex-wrap justify-content-between  gap-2 md:gap-6 px-5 py-2 md:px-8 md:py-4">
                    {footerConfig.links.map((linkGroup) => (
                        <div key={linkGroup.name} className="p-2">
                            {/* Section Title */}
                            <div className="text-yellow-500 font-bold mb-3 text-sm md:text-base">{linkGroup.name}</div>
                            {/* Links */}
                            <div className="flex flex-column gap-2">
                                {linkGroup.urls.map((urlData) => (
                                    <div key={urlData.url} className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => navigate(urlData.url)}>
                                        {/* Icon */}
                                        <span className={`pi ${urlData.icon || "pi-question-circle"} text-white text-xs md:text-sm`}></span>
                                        {/* Link Name */}
                                        <span className="text-white text-xs md:text-sm">{urlData.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <Divider className="m-0 w-auto mx-4" />

                <div className="flex flex-wrap gap-2 md:gap-5 justify-center px-2 py-2 md:px-6 md:py-4">
                    {footerConfig.organization.branches.map((brnach) => (
                        <div key={brnach.name} className="md:flex-1 p-2 text-center">
                            <p className="text-yellow-500 font-bold text-xs md:text-sm flex justify-content-center gap-2 md:gap-0">
                                <i className="pi pi-map-marker text-xs md:text-sm mr-2"></i>
                                {brnach.name}
                            </p>
                            <p className="text-xs md:text-sm">{brnach.full_address}</p>
                            <p className="text-xs md:text-sm">
                                <span className="pi pi-phone text-xs md:text-sm mr-2"></span>
                                {brnach.contact}
                            </p>
                        </div>
                    ))}
                </div>
                <Divider className="m-0 w-auto mx-4" />
                <div className="flex flex-column justify-content-between font-bold md:flex-row gap-1 sm:gap-0 px-6 py-2 md:px-6 md:py-4">
                    <span className="text-xs md:text-sm mb-1 flex align-items-center">
                        <i className="pi pi-building mr-1"></i>
                        {footerConfig.organization.name}
                    </span>
                    <span className="text-xs md:text-sm mb-1 flex align-items-center">
                        <i className="pi pi-copyright mr-1"></i>
                        {footerConfig.copyright_notice}
                    </span>
                    <span className="text-xs md:text-sm mb-1 flex align-items-center">
                        <i className="pi pi-envelope mr-1"></i>
                        {footerConfig.organization.email}
                    </span>
                </div>
            </div>
        );
    }
}
{
    /* <div className="flex flex-column md:flex-row md:flex-wrap lg:justify-content-around text-sm py-3 border-top-1 border-500">
                    <div className="flex flex-column gap-2 md:w-6 lg:w-2">
                        <p className="text-orange-400 text-lg font-bold">
                            Useful Links
                        </p>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Why Sahas
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            About us
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Career
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Contact us
                        </Button>
                    </div>
                    <div className="flex flex-column gap-2 md:w-6 lg:w-2">
                        <p className="text-orange-400 text-lg font-bold">
                            Policies
                        </p>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Service & Membership Terms
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Return/Refund Policy
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Help and Support
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Terms & Condition
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Privacy Policy
                        </Button>
                    </div>
                    <div className="flex flex-column gap-2 md:w-6 lg:w-2">
                        <p className="text-orange-400 text-lg font-bold">
                            Branches
                        </p>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Waghodia
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Karelibaug
                        </Button>
                        <Button
                            href="#"
                            className="text-white no-underline text-sm hover:underline p-1"
                            text
                        >
                            Sayajigunj
                        </Button>
                    </div>
                    <div className="flex flex-column gap-2 md:w-6 lg:w-2">
                        <p className="text-orange-400 text-lg font-bold">
                            Social Media
                        </p>
                        <Button
                            className="text-white no-underline text-sm hover:underline p-1"
                            pt={{
                                label: {
                                    style: { flex: "none" },
                                },
                            }}
                            label="Instagram"
                            icon="pi pi-instagram"
                            text
                        />
                        <Button
                            className="text-white no-underline text-sm hover:underline p-1"
                            pt={{
                                label: {
                                    style: { flex: "none" },
                                },
                            }}
                            label="Facebook"
                            icon="pi pi-facebook"
                            text
                        />
                        <Button
                            className="text-white no-underline text-sm hover:underline p-1"
                            pt={{
                                label: {
                                    style: { flex: "none" },
                                },
                            }}
                            label="YouTube"
                            icon="pi pi-youtube"
                            text
                        />
                    </div>
                </div>

                 */
}
