export default function Body({ heading, media_url, description, note }) {
    return (
        <div className="flex flex-column align-items-center gap-3">
            <div className="w-full border-round overflow-hidden shadow-2">
                <img src={media_url} alt="News Update" className="w-full block" style={{ maxHeight: "512px", objectFit: "cover" }} />
            </div>

            <div className="text-center">
                {!!heading && <h2 className="m-0 text-900 font-bold">{heading}</h2>}
                {!!description && <p className="mt-2 text-600 line-height-3">{description}</p>}
            </div>
            {!!note && (
                <div className="surface-100 border-round p-2 flex align-items-center gap-2 w-full">
                    <i className="pi pi-info-circle text-blue-500"></i>
                    <span className="text-sm text-700">{note}</span>
                </div>
            )}
        </div>
    );
}
