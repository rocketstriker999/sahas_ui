import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { EMPTY_VALUE } from "../../constants";
import { InputSwitch } from "primereact/inputswitch";

export default function ProfileCard({
    className,
    id,
    full_name = EMPTY_VALUE,
    phone = EMPTY_VALUE,
    email = "hammerbyte.nisarg@gmail.com",
    image,
    showViewMore = true,
    showStatusController,
}) {
    return (
        <div className={`pl-2 py-2 border-round border-1 border-gray-300 relative  ${className}`}>
            <div className="flex align-items-center">
                <div className="flex flex-column align-items-center">
                    <Avatar {...(image ? { image } : { icon: "pi pi-user" })} size="xlarge" shape="circle" />
                </div>
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
                <p
                    className="absolute top-0 right-0 m-0 p-2 text-xs bg-orange-500 shadow-3 text-white font-semibold "
                    style={{ borderBottomLeftRadius: "6px", borderTopRightRadius: "6px" }}
                >
                    View More
                </p>
            )}

            {showStatusController}
        </div>
    );
}
