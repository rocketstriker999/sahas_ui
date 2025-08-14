export default function TabHeader({ title, highlightOne, highlightTwo, actionItems }) {
    return (
        <div className="flex gap-2 px-3 pt-3 justify-content-between align-items-center">
            <div className="  flex flex-column gap-1 ">
                {title && <p className="m-0 font-bold">{title}</p>}
                {highlightOne && <li className="text-xs">{highlightOne}</li>}
                {highlightTwo && <li className="text-xs">{highlightTwo}</li>}
            </div>
            <div className="flex">{actionItems}</div>
        </div>
    );
}
