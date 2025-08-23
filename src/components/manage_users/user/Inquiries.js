import { Divider } from "primereact/divider";
import TabHeader from "../../common/TabHeader";
import { Tag } from "primereact/tag";
import { Accordion, AccordionTab } from "primereact/accordion";
import NoContent from "../../common/NoContent";
import { Button } from "primereact/button";
import Detail from "../../common/Detail";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../../common/Loading";
import { Badge } from "primereact/badge";
import DialogInquiryNotes from "./inquiries/DialogInquiryNotes";
import DialogAddInquiry from "./inquiries/DialogAddInquiry";
import { useOutletContext } from "react-router-dom";
import { getReadableDate } from "../../../utils";

export default function Inquiries() {
    const { userId, courses, branches, getCourseTitle } = useOutletContext();

    const [inquiries, setInquiries] = useState();
    const [selectedInquiryForNotes, setSelectedInquiryForNotes] = useState();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [addingNewInquiry, setAddingNewInquiry] = useState();

    useEffect(() => {
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

    const deleteInquiry = useCallback(
        (inquiryId) => {
            requestAPI({
                requestPath: `inquiries/${inquiryId}`,
                requestMethod: "DELETE",
                setLoading: setLoading,
                parseResponseBody: false,
                onResponseReceieved: (_, responseCode) => {
                    if (responseCode === 204) {
                        showToast({ severity: "success", summary: "Updated", detail: "Inquiry Deleted", life: 1000 });
                        setInquiries(inquiries.filter((inquiry) => inquiry.id !== inquiryId));
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Inquiry !", life: 2000 });
                    }
                },
            });
        },
        [inquiries, requestAPI, showToast]
    );

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader
                className={"px-3 pt-3"}
                title="User's Inquiries & Notes"
                highlights={[`Total - ${inquiries?.length} Inquiries`]}
                actionItems={[<Button icon="pi pi-plus" severity="warning" onClick={setAddingNewInquiry} />]}
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
                            <AccordionTab
                                key={inquiry.id}
                                header={() => (
                                    <div className="flex align-items-center">
                                        <div className="flex-1 flex flex-column gap-2 align-items-start">
                                            <p className="m-0 p-0 text-sm">
                                                {inquiries.length - index}. {getCourseTitle(inquiry.course_id)}
                                            </p>
                                            <p className="m-0 p-0 text-xs font-medium text-color-secondary">
                                                <i className="pi text-xs pi-calendar"></i> {getReadableDate({ date: inquiry?.created_on })}
                                            </p>
                                        </div>
                                        <Tag severity={inquiry?.active ? "success" : "danger"} value={inquiry?.active ? "Active" : "Closed"} />
                                    </div>
                                )}
                            >
                                <div className="flex gap-2 align-items-start justify-content-end">
                                    <div className="flex-1 flex flex-column gap-2">
                                        <Detail title="Created By" value={inquiry.created_by_full_name} />
                                        <Detail title="Branch" value={branches?.find((branch) => branch.id === inquiry?.branch_id)?.title} />
                                    </div>
                                    <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={() => deleteInquiry(inquiry.id)} />
                                    <div className="p-overlay-badge">
                                        <Button
                                            className="w-2rem h-2rem"
                                            icon="pi pi-clipboard"
                                            rounded
                                            severity="warning"
                                            onClick={() => setSelectedInquiryForNotes(inquiry)}
                                        />
                                        <Badge value={inquiry?.notes?.length} severity="secondary"></Badge>
                                    </div>
                                </div>
                            </AccordionTab>
                        ))}
                    </Accordion>
                ) : (
                    <NoContent error={"No Inquiries Found"} />
                )}
            </div>

            <DialogInquiryNotes
                selectedInquiryForNotes={selectedInquiryForNotes}
                setSelectedInquiryForNotes={setSelectedInquiryForNotes}
                setInquiries={setInquiries}
                getCourseTitle={getCourseTitle}
            />

            <DialogAddInquiry
                userId={userId}
                addingNewInquiry={addingNewInquiry}
                setAddingNewInquiry={setAddingNewInquiry}
                courses={courses}
                branches={branches}
                setInquiries={setInquiries}
            />
        </div>
    );
}
