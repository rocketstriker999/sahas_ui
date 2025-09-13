export default function TabHeader({ title, highlights, actionItems, className }) {
    return (
        <div className={`flex gap-2  justify-content-between align-items-center ${className}`}>
            <div className="flex flex-column gap-1 ">
                {title && <p className="m-0 font-bold">{title}</p>}

                {highlights?.map((highlight) => (
                    <li key={highlight} className="text-xs ml-2">
                        {highlight}
                    </li>
                ))}
            </div>
            <div className="flex gap-2 align-items-center">
                {actionItems?.map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
            </div>
        </div>
    );
}
