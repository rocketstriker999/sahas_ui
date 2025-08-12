export default function TabHeader({ title, highlightOne, highlightTwo }) {
    return (
        <div className="px-3 pt-3 flex flex-column gap-1">
            {title && <p className="m-0 font-bold">{title}</p>}
            {highlightOne && <li className="text-xs">{highlightOne}</li>}
            {highlightTwo && <li className="text-xs">{highlightTwo}</li>}
        </div>
    );
}
