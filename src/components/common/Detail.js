export default function Detail({ className, title = "Title", value = "Value", icon }) {
    return (
        <div className={`flex align-items-center gap-2 ${className}`}>
            {icon && <i className={icon} style={{ fontSize: "1.5rem" }}></i>}
            <div>
                <p className="p-0 m-0 text-xs font-bold text-color-secondary">{title}</p>
                <p className="p-0 m-0 text-sm">{value}</p>
            </div>
        </div>
    );
}
