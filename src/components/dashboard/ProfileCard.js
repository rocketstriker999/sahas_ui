import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../../styles";

export default function ProfileCard({ id = 1, name = "Nisarg Jani", phone = "9909727302", email = "hammerbyte.nisarg@gmail.com", image }) {

    return (
        <div className="my-2 pl-2 py-2 border-round border-1 border-gray-300 relative overflow-hidden ">
            <div className=" flex  align-items-center">
                <Avatar {...(image ? { image } : { icon: "pi pi-user" })} size="large" shape="circle" />
                <Divider layout="vertical" />
                <div className="flex-1 flex flex-column gap-2 py-2">
                    <h2 className={`${TEXT_SIZE_NORMAL} font-semibold p-0 m-0`}>
                        #{id} - {name}
                    </h2>
                    <div className={`flex align-items-center gap-2 ${TEXT_SIZE_NORMAL}`}>
                        <i className="pi pi-envelope"></i>
                        <p className="m-0 p-0">{email}</p>
                    </div>
                    <div className={`flex align-items-center gap-2 ${TEXT_SIZE_NORMAL}`}>
                        {phone && <i className="pi pi-phone"></i>}
                        {phone ? <p className="m-0 p-0">{phone}</p> : <Tag icon="pi pi-exclamation-circle" severity="danger" value="Missing Contact Details" />}
                    </div>
                </div>
            </div>

            <p className={`${TEXT_SIZE_SMALL} absolute top-0 right-0 m-0 p-2 bg-orange-500 shadow-3 text-white font-semibold`} style={{ borderBottomLeftRadius: "6px" }}>
                View More
            </p>
        </div>
    );
}
