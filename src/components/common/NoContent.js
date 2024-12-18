import { Message } from "primereact/message";

export default function NoContent({ error }) {
    if (error) {
        return <Message severity="error" text={error} />;
    }

    return <Message severity="info" text="No Content Found" />;
}
