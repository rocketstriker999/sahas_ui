export default function Thumbnail({ type, preview }) {
    if (type === "video") {
        return <video src={preview} alt="success" className="w-full max-h-6rem" />;
    }

    if (type === "audio") {
        return (
            <audio className="w-full" controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                <source src={preview} type="audio/mpeg" />
            </audio>
        );
    }

    if (type === "image") {
        return <img className="border-circle w-8rem" src={preview} alt="Preview" style={{ height: "6rem", objectFit: "cover" }} />;
    }

    if (type === "pdf") {
        return <embed src={preview} className="w-full max-h-6rem" />;
    }

    if (type === "sheet") {
        return <iframe title="preview" src={preview} className="w-full max-h-6rem" />;
    }
}
