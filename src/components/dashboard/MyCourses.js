import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/sliceUser";
import AskEmail from "../login/AskEmail";
import FormLogin from "../login/FormLogin";

export default function MyCourses() {
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.stateUser.user);

    useEffect(() => {
        //dispatch(setCurrentUser({ name: "Nisarg" }));
    }, []);

    if (loggedInUser) {
        return <p>User Courses</p>;
    } else {
        return <FormLogin />;
    }
}
