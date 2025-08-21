import { Dialog } from "primereact/dialog";
import { useCallback, useState } from "react";
import NoContent from "../../../common/NoContent";
import Loading from "../../../common/Loading";
import Detail from "../../../common/Detail";
import { Button } from "primereact/button";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { InputText } from "primereact/inputtext";
import { getReadableDate } from "../../../../utils";

export default function DialogInquiryNotes({ selectedInquiryForNotes, setSelectedInquiryForNotes, setInquiries, getCourseTitle }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();

    const [note, setNote] = useState();

    const deleteInquiryNote = useCallback(
        (noteId) => {
            requestAPI({
                requestPath: `inquiry-notes/${noteId}`,
                requestMethod: "DELETE",
                setLoading: setLoading,
                parseResponseBody: false,
                onResponseReceieved: (_, responseCode) => {
                    if (responseCode === 204) {
                        showToast({ severity: "success", summary: "Updated", detail: "Inquiry Note Deleted", life: 1000 });
                        setInquiries((prev) =>
                            prev?.map((inquiry) => {
                                if (inquiry.id === selectedInquiryForNotes.id) {
                                    inquiry.notes = inquiry?.notes?.filter((note) => note.id !== noteId);
                                }

                                return inquiry;
                            })
                        );
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Deleted Inquiry Note !", life: 2000 });
                    }
                },
            });
        },
        [requestAPI, selectedInquiryForNotes, setInquiries, showToast]
    );

    const addInquiryNote = useCallback(() => {
        requestAPI({
            requestPath: `inquiries/${selectedInquiryForNotes?.id}/notes`,
            requestMethod: "POST",
            setLoading: setLoading,
            requestPostBody: { note, inquiry_id: selectedInquiryForNotes.id },

            onResponseReceieved: (inquiryNotes, responseCode) => {
                if (responseCode === 201) {
                    showToast({ severity: "success", summary: "Added", detail: "Inquiry Note Added", life: 1000 });
                    setInquiries((prev) =>
                        prev?.map((inquiry) => {
                            if (inquiry.id === selectedInquiryForNotes.id) {
                                inquiry.notes = inquiryNotes;
                            }
                            return inquiry;
                        })
                    );
                    setNote();
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Add Inquiry Note !", life: 2000 });
                }
            },
        });
    }, [note, requestAPI, selectedInquiryForNotes, setInquiries, showToast]);

    return (
        <Dialog
            header={`Inquiry Notes - ${getCourseTitle(selectedInquiryForNotes?.course_id)}`}
            visible={selectedInquiryForNotes}
            className="w-11"
            onHide={() => setSelectedInquiryForNotes(false)}
        >
            <div className="pt-2">
                {loading ? (
                    <Loading message={"Updating Inquiry Note"} />
                ) : (
                    <div className="flex flex-column gap-4">
                        <div className="p-inputgroup flex-1">
                            <InputText placeholder="Add Note" value={note} onChange={(e) => setNote(e.target.value)} />
                            <Button icon="pi pi-plus" className="p-button-warning" onClick={addInquiryNote} />
                        </div>
                        <div>
                            {selectedInquiryForNotes?.notes?.length ? (
                                selectedInquiryForNotes.notes.map(({ id, created_by_full_name, created_on, note }) => (
                                    <div key={id} className="flex align-items-start gap-2 mb-2">
                                        <Detail
                                            icon="pi pi-angle-right"
                                            className="flex-1 mb-2"
                                            title={`${created_by_full_name} at ${getReadableDate({ date: created_on })}`}
                                            value={note}
                                        />
                                        <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={() => deleteInquiryNote(id)} />
                                    </div>
                                ))
                            ) : (
                                <NoContent error="No Notes Found" />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Dialog>
    );
}
