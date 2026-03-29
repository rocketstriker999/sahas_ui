import { Divider } from "primereact/divider";
import { TEXT_SIZE_SMALL } from "../../style";

export default function Summary({ icon, title, values, className }) {
    return (
        <div className={className}>
            <div className="flex align-items-center gap-2">
                {icon && <span className={icon} />}
                {title && <span className="font-bold ">{title}</span>}
            </div>
            {values?.length && <Divider className="my-2" />}

            {values?.length && (
                <ul className="pl-3">
                    {values?.map((value) => (
                        <li key={value} className={`${TEXT_SIZE_SMALL} mb-1`}>
                            {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
