import { useNavigate } from "react-router-dom";
import { RUPEE } from "../../constants";
import { getReadableDate } from "../../utils";
import { Tag } from "primereact/tag";

export default function Transaction({ id, user_id, full_name, amount, courses, created_on, handler }) {
    const navigate = useNavigate();

    return (
        <div
            className="border-1 border-gray-300  px-3 py-2 border-round flex align-items-center gap-2  "
            onClick={() => {
                navigate(`/manage-users/${user_id}/enrollments`);
            }}
        >
            <div className="flex flex-column align-items-start gap-1 flex-1">
                <span>
                    {id}. {full_name}
                </span>
                {handler && <Tag value={handler}></Tag>}
                {courses?.map(({ title }) => (
                    <span className="text-xs text-color-secondary">{title}</span>
                ))}
            </div>

            <div className="flex flex-column gap-2 align-items-end">
                <span className="text-green-800 bg-green-100 px-2 py-1  border-1 border-round border-green-300">
                    + {amount}
                    {RUPEE}
                </span>
                <div className="flex align-items-center gap-1 text-color-secondary">
                    <span className="pi pi-calendar"></span>
                    <span className="text-xs ">{getReadableDate({ date: created_on })}</span>
                </div>
            </div>
        </div>
    );
}
