import { Badge } from "primereact/badge";

export function MediaType({ onClick, selected, media, title }) {
    return (
        <div
            className={`flex justify-content-center align-items-center gap-2 p-3 ${selected && "border-bottom-2 bg-gray-100 border-round-top"} `}
            style={{ cursor: "pointer" }}
            onClick={onClick}
        >
            {!!media && <Badge value={media?.length} />}
            <span className="font-bold white-space-nowrap">{title}</span>
        </div>
    );
}
