import { useMemo } from "react";
import Detail from "../components/common/Detail";
import { ICON_SIZE, SUB_TITLE_TEXT, TEXT_SIZE_NORMAL } from "../style";

import PageTitle from "../components/common/PageTitle";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default function ContactUs() {
    const contactUs = useMemo(
        () => ({
            social_media: [
                { url: "https://www.facebook.com/sahasinstitute", icon: "pi-facebook" },
                { url: "https://www.instagram.com/commerce_ke_kings/", icon: "pi-instagram" },
                { url: "https://www.youtube.com/channel/UCy5Klqv-1iS28nAcgn8Ps6w", icon: "pi-youtube" },
            ],
            branches: [
                {
                    id: 1,
                    title: "Waghodia Branch",
                    phone: "+91 9265352165",
                    address: "FF9 Sharnam/complex,Opp. HDFC Bank, Near Crystal School, Waghodia Dabhoi ring Road.",
                },
                {
                    id: 2,
                    title: "Karelibaug Branch",
                    phone: "+91 9265347133",
                    address: "E 110 Vrundavan Township, Beside Tasty Restaurant, Near Sangam Cross Road, Karelibaug",
                },
                {
                    id: 3,
                    title: "Sayajigunj Branch",
                    phone: "+91 9265343871",
                    address:
                        "3rd Floor (347,348,349), Iscon Janmahal, Opposite Vadodara Railway Station, Above Vitcos Bus Stand Beside Msu, Sayajigunj - Vadodara",
                },
            ],
        }),
        [],
    );

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Contact Us`} />

            <div className="flex flex-column gap-3 p-3">
                <Detail icon="pi pi-envelope" title="Support" value="support@sahasinstitute.com" />
                <Detail icon="pi pi-globe" title="Website" value="https://www.sahasinstitute.com" />

                <Divider className="my-2 p-0" />
                <h3 className={`m-0 font-semibold text-gray-600`}>Branch Locations</h3>
                <Accordion>
                    {contactUs?.branches.map((branch) => (
                        <AccordionTab
                            key={branch.id}
                            header={
                                <div className="flex align-items-center gap-2 w-full">
                                    <i className="pi pi-map-marker text-primary"></i>
                                    <span className={`font-semibold ${TEXT_SIZE_NORMAL}`}>{branch.title}</span>
                                </div>
                            }
                        >
                            <div className="flex flex-column gap-3">
                                <div className="flex align-items-center gap-2">
                                    <Detail icon="pi pi-phone" title="Contact" value={branch.phone} className="flex-1 border-round" />
                                    <Button
                                        icon="pi pi-phone"
                                        rounded
                                        outlined
                                        severity="success"
                                        size="small"
                                        onClick={() => window.open(`tel:${branch.phone}`, "_self")}
                                        aria-label="Call"
                                    />
                                </div>
                                <div className="flex align-items-center gap-2">
                                    <Detail icon="pi pi-map" title="Address" value={branch.address} className="flex-1 border-round" />
                                    <Button
                                        icon="pi pi-map-marker"
                                        rounded
                                        outlined
                                        severity="info"
                                        size="small"
                                        onClick={() => {
                                            const address = encodeURIComponent(branch.address);
                                            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank");
                                        }}
                                        aria-label="Open in Google Maps"
                                    />
                                </div>
                            </div>
                        </AccordionTab>
                    ))}
                </Accordion>

                <div>
                    <div className="flex justify-content-center align-items-center gap-2">
                        {contactUs?.social_media?.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex align-items-center text-color p-2 no-underline"
                            >
                                <i className={`pi ${social.icon} ${ICON_SIZE}`}></i>
                            </a>
                        ))}
                    </div>
                    <p className="text-center font-semibold text-center text-xs m-1 text-color-secondary">Social Media</p>
                </div>
            </div>
        </div>
    );
}
