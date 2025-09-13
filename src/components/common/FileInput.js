import Preview from "./ImageInput/Preview";
import PlaceHolder from "./ImageInput/PlaceHolder";

export default function FileInput({ className, label, type, cdn_url, setCDNUrl, disabled }) {
    return (
        <div className={` p-4 border-1 border-gray-300 border-round ${className} `}>
            {cdn_url ? (
                <Preview disabled={disabled} cdn_url={cdn_url} setCDNUrl={setCDNUrl} label={label} />
            ) : (
                <PlaceHolder disabled={disabled} label={label} setCDNUrl={setCDNUrl} />
            )}
        </div>
    );
}
