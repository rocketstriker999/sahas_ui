import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GuestUserGeneration from "../../pages/GuestUserGeneration";

export default function RequiresLoggedInUser() {
    const loggedInUser = useSelector((state) => state.stateUser);
    return !!loggedInUser ? <Outlet /> : <GuestUserGeneration />;
}
