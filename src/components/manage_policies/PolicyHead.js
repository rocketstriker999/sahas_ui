import { getReadableDate } from "../../utils";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../style";

export default function PolicyHead({ index, title, created_at, updated_at }) {
    return (
        <div className="flex align-items-center">
            <div className="flex-1 flex flex-column gap-2 align-items-start">
                <p className={`m-0 p-0 ${TEXT_SIZE_NORMAL}`}>
                    {index}. {title}
                </p>
                {created_at && (
                    <p className={`${TEXT_SIZE_SMALL} m-0 p-0 font-medium text-color-secondary`}>
                        <i className={`${TEXT_SIZE_SMALL} pi pi-calendar`}></i> Updated at {getReadableDate({ date: updated_at || created_at })}
                    </p>
                )}
            </div>
        </div>
    );
}
