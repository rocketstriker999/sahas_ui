import Preview from "./FileInput/Preview";
import PlaceHolder from "./FileInput/PlaceHolder";
import { useState } from "react";

export default function FileInput({ className, label, type, cdn_url, setCDNUrl, disabled }) {
    const [preview, setPreview] = useState(!!cdn_url);

    return (
        <div className={` p-4 border-1 border-gray-300 border-round ${className} `}>
            {!!preview ? (
                <Preview type={type} disabled={disabled} preview={preview} setPreview={setPreview} setCDNUrl={setCDNUrl} label={label} />
            ) : (
                <PlaceHolder disabled={disabled} label={label} setCDNUrl={setCDNUrl} setPreview={setPreview} type={type} />
            )}
        </div>
    );
}
