import { useSelector } from "react-redux";
import { Outlet, useOutletContext } from "react-router-dom";
import GuestUserGeneration from "../../pages/GuestUserGeneration";

export default function RequiresLoggedInUser() {
    const loggedInUser = useSelector((state) => state.stateUser);

    const { streamSelectionTestResult, setStreamSelectionTestResult } = useOutletContext();

    return !!loggedInUser ? <Outlet context={{ streamSelectionTestResult, setStreamSelectionTestResult }} /> : <GuestUserGeneration />;
}
