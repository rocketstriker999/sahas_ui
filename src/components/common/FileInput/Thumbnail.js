export default function Thumbnail({ type, preview }) {
    if (type === "video") {
        return <video src={preview} alt="success" className="w-full " autoPlay />;
    }

    if (type === "image") {
        return <img className="border-circle w-8rem" src={preview} alt="Preview" style={{ height: "6rem", objectFit: "cover" }} />;
    }

    if (type === "pdf") {
        return <embed src={preview} className="w-full " />;
    }
}
