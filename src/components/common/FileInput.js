import Preview from "./ImageInput/Preview";
import PlaceHolder from "./ImageInput/PlaceHolder";

export default function FileInput({ className, label, type, file, setFile }) {
    return (
        <div
            className={`flex flex-column align-items-center justify-content-center gap-3 cursor-pointer p-4 border-1 border-gray-300 border-round ${className} `}
        >
            {file ? <Preview file={file} setFile={setFile} label={label} /> : <PlaceHolder label={label} setFile={setFile} />}
        </div>
    );
}
