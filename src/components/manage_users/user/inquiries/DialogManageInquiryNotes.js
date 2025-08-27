import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import NoContent from "../../../common/NoContent";
import Loading from "../../../common/Loading";
import { useOutletContext } from "react-router-dom";
import CardInputNote from "./CardInputNote";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import Notes from "./Notes";

export default function DialogManageInquiryNotes({ visible, closeDialog, course_id, inquiry_id, setNotesCount }) {
    const { getCourseTitle } = useOutletContext();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [notes, setNotes] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (inquiry_id)
            requestAPI({
                requestPath: `inquiries/${inquiry_id}/notes`,
                requestMethod: "GET",
                setLoading: setLoading,
                onRequestFailure: setError,
                onResponseReceieved: (notes, responseCode) => {
                    if (notes && responseCode === 200) {
                        setNotes(notes);
                    } else {
                        setError("Failed To Load Inquiry Notes");
                    }
                },
            });
    }, [inquiry_id, requestAPI]);

    useEffect(() => {
        setNotesCount(() => notes?.length);
    }, [notes, setNotesCount]);

    return (
        <Dialog header={`Inquiry Notes - ${getCourseTitle(course_id)}`} visible={visible} className="w-11" onHide={closeDialog}>
            <div className="flex flex-column gap-4 pt-3 " style={{ maxHeight: "75vh" }}>
                <CardInputNote inquiry_id={inquiry_id} setNotes={setNotes} />
                {loading ? <Loading /> : error ? <NoContent error={error} /> : <Notes notes={notes} setNotes={setNotes} />}
            </div>
        </Dialog>
    );
}
