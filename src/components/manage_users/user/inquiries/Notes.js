import NoContent from "../../../common/NoContent";
import Note from "./Note";

export default function Notes({ notes, setNotes }) {
    return notes?.length ? (
        <div className="flex-1 overflow-y-scroll h-full">
            {notes.map((note) => (
                <Note key={note?.id} {...note} setNotes={setNotes} />
            ))}
        </div>
    ) : (
        <NoContent error="No Notes Found" />
    );
}
