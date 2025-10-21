import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";
import { EMPTY_VALUE } from "../../../constants";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../../style";

export default function UserCard({ id, email, image, full_name, phone, active }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`${id}/basics`)} className="bg-white border-round-md shadow-3 mb-2 flex p-3 align-items-center gap-4 relative" key={id}>
            <Avatar {...(image ? { image: image } : { icon: "pi pi-user" })} size="xlarge" shape="circle" />
            <div className="flex flex-column gap-1 flex-1">
                <p className={`m-0 p-0 font-semibold ${TEXT_SIZE_NORMAL}`}>
                    #{id}. {full_name || EMPTY_VALUE}
                </p>
                <div className="flex align-items-center gap-2 text-color-secondary">
                    <i className={`pi pi-envelope ${TEXT_SIZE_SMALL}`}></i>
                    <p className={`m-0 p-0 font-semibold ${TEXT_SIZE_SMALL}`}>{email}</p>
                </div>
                <div className="flex align-items-center gap-2 text-color-secondary">
                    <i className={`pi pi-phone ${TEXT_SIZE_SMALL}`}></i>
                    <p className={`m-0 p-0 font-semibold ${TEXT_SIZE_SMALL}`}>{phone || EMPTY_VALUE}</p>
                </div>
            </div>
            <i className="pi pi-angle-right"></i>

            {!active && <Tag className="top-0 right-0 absolute m-1" severity="danger" value="Inactive"></Tag>}
        </div>
    );
}
