import { Divider } from "primereact/divider";
import TabHeader from "../../common/TabHeader";
import { Accordion, AccordionTab } from "primereact/accordion";
import NoContent from "../../common/NoContent";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../../common/Loading";
import DialogAddInquiry from "./inquiries/DialogAddInquiry";
import { useOutletContext } from "react-router-dom";
import InquiryBody from "./inquiries/InquiryBody";
import InquiryHead from "./inquiries/InquiryHead";

export default function Inquiries() {
    const { userId } = useOutletContext();

    const [inquiries, setInquiries] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [dialogAddInquiry, setDialogAddInquiry] = useState();

    useEffect(() => {
        if (userId)
            requestAPI({
                requestPath: `users/${userId}/inquiries`,
                requestMethod: "GET",
                setLoading: setLoading,
                onRequestFailure: setError,
                onResponseReceieved: (inquiries, responseCode) => {
                    if (inquiries && responseCode === 200) {
                        setInquiries(inquiries);
                    } else {
                        setError("Couldn't load User Inquiries");
                    }
                },
            });
    }, [requestAPI, userId]);

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader
                className={"px-3 pt-3"}
                title="User's Inquiries & Notes"
                highlights={[`Total - ${inquiries?.length} Inquiries`]}
                actionItems={[
                    <Button
                        icon="pi pi-plus"
                        severity="warning"
                        onClick={() => setDialogAddInquiry({ visible: true, setVisible: setDialogAddInquiry, setInquiries })}
                    />,
                ]}
            />

            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Inquiries" />
                ) : error ? (
                    <NoContent error={error} />
                ) : inquiries?.length ? (
                    <Accordion>
                        {inquiries.map((inquiry, index) => (
                            <AccordionTab key={inquiry.id} header={() => <InquiryHead index={inquiries.length - index} {...inquiry} />}>
                                <InquiryBody setInquiries={setInquiries} {...inquiry} />
                            </AccordionTab>
                        ))}
                    </Accordion>
                ) : (
                    <NoContent error={"No Inquiries Found"} />
                )}
            </div>

            <DialogAddInquiry {...dialogAddInquiry} />
        </div>
    );
}
