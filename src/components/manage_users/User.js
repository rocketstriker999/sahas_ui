import { EMPTY_VALUE } from "../../constants";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";

export default function User({ id, email, image, full_name, phone, active }) {
    return (
        <div className="bg-white border-round-md shadow-3 mb-2 flex p-3 align-items-center gap-4 relative" key={id}>
            <Avatar {...(image ? { image: image } : { icon: "pi pi-user" })} size="xlarge" shape="circle" />
            <div className="flex flex-column gap-1">
                <p className="text-md m-0 p-0 font-semibold">
                    #{id}. {full_name || EMPTY_VALUE}
                </p>
                <div className="flex align-items-center gap-2  text-color-secondary	">
                    <i className="pi pi-envelope text-xs "></i>
                    <p className="m-0 p-0 text-xs font-semibold">{email}</p>
                </div>
                <div className="flex align-items-center gap-2  text-color-secondary	">
                    <i className="pi pi-phone text-xs"></i>
                    <p className="m-0 p-0  text-xs font-semibold">{phone || EMPTY_VALUE}</p>
                </div>
            </div>

            {!active && <Tag className="top-0 right-0 absolute m-1" severity="danger" value="Inactive"></Tag>}
        </div>
    );
}
