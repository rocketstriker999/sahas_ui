export default function TabHeader({ title, highlightOne, highlightTwo, actionItems, className }) {
    return (
        <div className={`flex gap-2  justify-content-between align-items-center ${className}`}>
            <div className="flex flex-column gap-1 ">
                {title && <p className="m-0 font-bold">{title}</p>}
                {highlightOne && (
                    <li key={highlightOne} className="text-xs">
                        {highlightOne}
                    </li>
                )}
                {highlightTwo && (
                    <li key={highlightTwo} className="text-xs">
                        {highlightTwo}
                    </li>
                )}
            </div>
            <div className="flex">{actionItems}</div>
        </div>
    );
}

// px-3 pt-3
