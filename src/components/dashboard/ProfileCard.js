import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

export default function ProfileCard({
    id = 1,
    full_name = "Nisarg Jani",
    phone = "9909727302",
    email = "hammerbyte.nisarg@gmail.com",
    image,
    showViewMore = true,
}) {
    return (
        <div className={`my-2 pl-2 py-2 border-round border-1 border-gray-300 relative overflow-hidden`}>
            <div className=" flex  align-items-center">
                <Avatar {...(image ? { image } : { icon: "pi pi-user" })} size="xlarge" shape="circle" />
                <Divider layout="vertical" />
                <div className="flex-1 flex flex-column gap-2 py-2">
                    <h2 className="text-xl font-semibold p-0 m-0">
                        # {id} - {full_name}
                    </h2>
                    <div className="flex align-items-center gap-2 text-sm">
                        <i className="pi pi-envelope"></i>
                        <p className="m-0 p-0">{email}</p>
                    </div>
                    <div className="flex align-items-center gap-2 text-sm">
                        {phone && <i className="pi pi-phone"></i>}
                        {phone ? <p className="m-0 p-0">{phone}</p> : <Tag icon="pi pi-exclamation-circle" severity="danger" value="Missing Contact Details" />}
                    </div>
                </div>
            </div>

            {showViewMore && (
                <p className="absolute top-0 right-0 m-0 p-2 text-xs bg-orange-500 shadow-3 text-white font-semibold" style={{ borderBottomLeftRadius: "6px" }}>
                    View More
                </p>
            )}
        </div>
    );
}
