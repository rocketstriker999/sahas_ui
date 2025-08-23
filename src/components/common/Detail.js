export default function Detail({ className, title, value, icon, more }) {
    return (
        <div className={`flex align-items-center gap-2 ${className}`}>
            {icon && <i className={icon} style={{ fontSize: "1.5rem" }}></i>}
            <div>
                {title && <div className="text-xs font-bold text-color-secondary">{title}</div>}
                {value && <div className="text-sm">{value}</div>}
                {more && (
                    <li key={more} className="text-xs">
                        {more}
                    </li>
                )}
            </div>
        </div>
    );
}
