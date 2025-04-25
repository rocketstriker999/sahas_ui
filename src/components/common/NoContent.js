import { Message } from "primereact/message";
import { Button } from "primereact/button";

export default function NoContent({ error, retry }) {
    return (
        <div className="flex flex-column align-items-center p-2">
            <Message className="m-2" severity={error ? "error" : "info"} text={error || "No Content Found"} />
            {retry && <Button label="Retry" severity="warning" onClick={retry} />}
        </div>
    );
}
