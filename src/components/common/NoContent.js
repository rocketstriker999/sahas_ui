import { Message } from "primereact/message";
import { Button } from "primereact/button";

export default function NoContent({ error, retry }) {
    if (error) {
        return <Message className="m-2" severity="error" text={error} />;
    }

    return (
        <>
            <Message className="m-2" severity="info" text="No Content Found" />
            {retry && <Button label="Warning" severity="warning" onClick={retry} />}
        </>
    );
}
