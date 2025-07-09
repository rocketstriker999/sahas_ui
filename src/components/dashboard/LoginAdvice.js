import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";

export default function LoginAdvice() {
    const navigate = useNavigate();

    return (
        <div className="my-2 pl-2 py-2 border-round border-1 border-gray-300 relative overflow-hidden ">
            <div className=" flex align-items-center">
                <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                <Divider layout="vertical" />
                <div className="flex-1 flex flex-column gap-2 py-2">
                    <p className="text-sm font-semibold p-0 m-0 ">Sahas Smart Studies</p>
                    <p className="m-0 p-0 text-xs text-gray-800	">Let's Get Started !</p>
                    <Button onClick={() => navigate("/login")} label="Login" severity="warning" className="w-4 p-1 text-xs shadow-3 " />
                </div>
            </div>

            <p className="absolute top-0 right-0 m-0 p-2 text-xs bg-gray-800 shadow-3 text-white font-semibold" style={{ borderBottomLeftRadius: "6px" }}>
                Let'S Start
            </p>
        </div>
    );
}
