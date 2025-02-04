import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { requestService } from "../utils";
import { setCurrentUser } from "../redux/sliceUser";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";

export default function HasPrimaryDetails({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const navigate = useNavigate();

    const updatePrimaryDetails = () => {
        requestService({
            requestMethod: "PATCH",
            requestPostBody: {
                name,
                phone,
            },
            requestPath: `users/${loggedInUser.id}/primary-details`,
            setLoading: setLoading,
            onResponseReceieved: (user, responseCode) => {
                if (user && responseCode === 200) {
                    dispatch(setCurrentUser(user));
                }
            },
        });
    };

    if (loggedInUser.name && loggedInUser.email && loggedInUser.phone) {
        return children;
    } else {
        return (
            <div className="p-4 mx-auto mt-4 text-center border-round shadow-4 w-10 sm:w-8 md:w-6">
                <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                <h2 className="text-center text-base">Basic Information Needed to Purchase</h2>
                <Divider />
                <p className="text-center text-xs mb-4">Please provide the following details to proceed with your purchase.</p>

                <div className="p-inputgroup flex-1 mb-4">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText onChange={(e) => setName(e.target.value)} disabled={loading} placeholder={"Your Name"} />
                </div>

                <div className="p-inputgroup flex-1 mb-4">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-phone"></i>
                    </span>
                    <InputText keyfilter="int" onChange={(e) => setPhone(e.target.value)} disabled={loading} placeholder={"Your Phone Number"} />
                </div>

                <div className="flex justify-content-around mt-4">
                    <Button label="Back" disabled={loading} severity="secondary" onClick={() => navigate(-1)} />
                    <Button label="Update" loading={loading} onClick={updatePrimaryDetails} severity="info" />
                </div>
            </div>
        );
    }
}
