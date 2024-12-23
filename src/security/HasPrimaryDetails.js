import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { requestProxy } from "../utils";
import { setCurrentUser } from "../redux/sliceUser";

export default function HasPrimaryDetails({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();

    const refInputName = useRef();
    const refInputPhone = useRef();

    const updatePrimaryDetails = () => {
        requestProxy({
            requestMethod: "PATCH",
            requestPostBody: {
                name: refInputName.current,
                phone: refInputPhone.current,
            },
            requestPath: `/api/users/${loggedInUser.id}/primary-details`,
            setLoading: setLoading,
            onResponseReceieved: (user, responseCode) => {
                if (user && responseCode === 200) {
                    //updated and
                    //dispatch action to set user into redux
                    dispatch(setCurrentUser(user));
                }
            },
        });
    };

    if (loggedInUser.name && loggedInUser.email && loggedInUser.phone) {
        return children;
    } else {
        return (
            <Fragment>
                <div>
                    <p>Below Information are needed In Order TO Purchase</p>
                    <InputText ref={refInputName} disabled={loading || loggedInUser.name} placeholder={loggedInUser.name || "Name"} />
                    <InputText ref={refInputPhone} disabled={loading || loggedInUser.phone} placeholder={loggedInUser.phone || "Phone"} />
                    <Button label="Update" onClick={updatePrimaryDetails} />
                </div>
            </Fragment>
        );
    }
}
