import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

export default function ProfileCard({ id = 1, name = "Nisarg Jani", phone = "9909727302", email = "hammerbyte.nisarg@gmail.com", image }) {
    return (
        <div className="my-2 pl-2 py-2 border-round border-1 border-gray-300 relative overflow-hidden ">
            <div className=" flex  align-items-center">
                <Avatar {...(image ? { image } : { icon: "pi pi-user" })} size="xlarge" shape="circle" />
                <Divider layout="vertical" />
                <div className="flex-1 flex flex-column gap-2 py-2">
                    <h2 className="text-xl font-semibold p-0 m-0">
                        #{id} - {name}
                    </h2>
                    <div className="flex align-items-center gap-2 text-sm">
                        <i className="pi pi-envelope"></i>
                        <p className="m-0 p-0">{email}</p>
                    </div>
                    <div className="flex align-items-center gap-2 text-sm">
                        <i className="pi pi-phone"></i>
                        <p className="m-0 p-0">{phone}</p>
                    </div>
                </div>
            </div>

            <p class="absolute top-0 right-0 m-0 p-2 text-xs bg-orange-500 shadow-3 text-white font-semibold" style={{ borderBottomLeftRadius: "6px" }}>
                View More
            </p>
        </div>
    );
}
