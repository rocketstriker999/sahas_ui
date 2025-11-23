export default function Thumbnail({ type, preview }) {
    if (type === "video") {
        return <video src={preview} alt="success" className="w-full " />;
    }

    if (type === "image") {
        return <img className="border-circle w-full" src={preview} alt="Preview" style={{ objectFit: "cover" }} />;
    }
}
