import { Divider } from "primereact/divider";
import TabHeader from "./TabHeader";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Accordion, AccordionTab } from "primereact/accordion";
import NoContent from "../../common/NoContent";
import { Button } from "primereact/button";
import Detail from "../../common/Detail";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../../common/Loading";
import { Badge } from "primereact/badge";

export default function Inquiries({ userId, branches, authorities, courses }) {
    const [inquiries, setInquiries] = useState();
    const [selectedInquiryIndex, setselectedInquiryIndex] = useState(false);
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [deletingInquiryNote, setDeletingInquiryNote] = useState();
    const [error, setError] = useState();

    const [addInquiryVisible, setAddInquiryVisible] = useState();

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

    const deleteInquiryNote = useCallback(
        (noteId) => {
            requestAPI({
                requestPath: `inquiry-notes/${noteId}`,
                requestMethod: "DELETE",
                setLoading: setDeletingInquiryNote,
                parseResponseBody: false,
                onResponseReceieved: (_, responseCode) => {
                    if (responseCode === 204) {
                        showToast({ severity: "success", summary: "Updated", detail: "Inquiry Note Deleted", life: 1000 });
                        setInquiries((prev) => {
                            prev[selectedInquiryIndex].notes = prev?.[selectedInquiryIndex]?.notes?.filter((note) => note.id !== noteId);
                            return prev;
                        });
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Inquiry Note !", life: 2000 });
                    }
                },
            });
        },
        [requestAPI, selectedInquiryIndex, showToast]
    );

    const getCourseTitle = useCallback(
        (courseId) => {
            return courses?.find((course) => course.id === courseId)?.title;
        },
        [courses]
    );

    return (
        <div>
            <TabHeader
                title="User's Inquiries & Notes"
                highlightOne={`Total - ${inquiries?.length} Inquiries`}
                actionItems={[<Button icon="pi pi-plus" severity="warning" onClick={setAddInquiryVisible} />]}
            />

            <Divider />
            <div className="px-3">
                {loading ? (
                    <Loading message="Loading Inquiries" />
                ) : error ? (
                    <NoContent error={error} />
                ) : inquiries?.length ? (
                    <Accordion>
                        {inquiries?.length ? (
                            inquiries.map((inquiry, index) => (
                                <AccordionTab
                                    key={inquiry.id}
                                    header={() => (
                                        <div className="flex align-items-center">
                                            <div className="flex-1 flex flex-column gap-2 align-items-start">
                                                <p className="m-0 p-0 text-sm">
                                                    {inquiry.id}. {getCourseTitle(inquiry.course_id)}
                                                </p>
                                                <p className="m-0 p-0 text-xs font-medium text-color-secondary">
                                                    <i className="pi text-xs pi-calendar"></i> {inquiry.created_on}
                                                </p>
                                            </div>
                                            <Tag severity={inquiry?.active ? "success" : "danger"} value={inquiry?.active ? "Active" : "Closed"} />
                                        </div>
                                    )}
                                >
                                    <div className="flex gap-2 align-items-start justify-content-end">
                                        <div className="flex-1 flex flex-column gap-2">
                                            <Detail title="Created By" value={inquiry.created_by_full_name} />
                                            <Detail title="Branch" value={branches?.find((branch) => branch.id === inquiry?.branch)?.title} />
                                        </div>
                                        <Button
                                            className="w-2rem h-2rem"
                                            icon="pi pi-trash"
                                            rounded
                                            severity="danger"
                                            onClick={() => deleteInquiry(inquiry.id)}
                                        />
                                        <div className="p-overlay-badge">
                                            <Button
                                                className="w-2rem h-2rem"
                                                icon="pi pi-clipboard"
                                                rounded
                                                severity="warning"
                                                onClick={() => setselectedInquiryIndex(index)}
                                            />
                                            <Badge value={inquiry?.notes?.length} severity="secondary"></Badge>
                                        </div>
                                    </div>
                                </AccordionTab>
                            ))
                        ) : (
                            <NoContent error={"No Inquiries Found"} />
                        )}
                    </Accordion>
                ) : (
                    <NoContent error={"No Inquiries Found"} />
                )}
            </div>

            <Dialog
                header={`Inquiry Notes - ${getCourseTitle(inquiries?.[selectedInquiryIndex]?.course_id)}`}
                visible={selectedInquiryIndex !== false}
                className="w-11"
                onHide={() => setselectedInquiryIndex(false)}
            >
                <div className="pt-2">
                    {deletingInquiryNote ? (
                        <Loading message={"Deleting Inquiry Note"} />
                    ) : inquiries?.[selectedInquiryIndex]?.notes?.length ? (
                        inquiries?.[selectedInquiryIndex]?.notes.map(({ id, created_by_full_name, created_on, note }) => (
                            <div className="flex align-items-start gap-2 mb-2">
                                <Detail className={"flex-1 mb-2"} title={`${created_by_full_name} at ${created_on}`} value={note} />
                                <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={() => deleteInquiryNote(id)} />
                            </div>
                        ))
                    ) : (
                        <NoContent error="No Notes Found" />
                    )}
                </div>
            </Dialog>

            <Dialog header={`Add New Inquiry`} visible={addInquiryVisible} className="w-11" onHide={() => setAddInquiryVisible(false)}>
                <div className="pt-2">
                    <p>Add New Inquiry</p>
                </div>
            </Dialog>
        </div>
    );
}
