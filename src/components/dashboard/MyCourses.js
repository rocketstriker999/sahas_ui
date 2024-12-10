import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/sliceUser";

export default function MyCourses() {
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    useEffect(() => {
        dispatch(setCurrentUser({ name: "Nisarg" }));
    }, []);

    if (loggedInUser) {
        return <p>You are user {loggedInUser.name}</p>;
    } else {
        return <p>Login To Continue</p>;
    }
}
