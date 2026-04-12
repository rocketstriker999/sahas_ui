import { TEXT_SMALL, TEXT_NORMAL } from "../../style";

export default function Detail({ className, title, value, icon, more }) {
    return (
        <div className={`flex align-items-center gap-2 ${className}`}>
            {icon && <i className={icon} style={{ fontSize: "1.5rem" }}></i>}
            <div>
                {title && <div className={`${TEXT_SMALL} font-bold text-color-secondary`}>{title}</div>}
                {value && <div className={`${TEXT_NORMAL}`}>{value}</div>}
                {more && (
                    <li key={more} className={`${TEXT_SMALL}`}>
                        {more}
                    </li>
                )}
            </div>
        </div>
    );
}
