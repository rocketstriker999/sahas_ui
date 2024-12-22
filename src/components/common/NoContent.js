import { Message } from "primereact/message";

export default function NoContent({ error }) {
    if (error) {
        return <Message className="m-3" severity="error" text={error} />;
    }

    return <Message className="m-3" severity="info" text="No Content Found" />;
}
