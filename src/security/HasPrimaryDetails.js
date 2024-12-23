import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { requestProxy } from "../utils";
import { setCurrentUser } from "../redux/sliceUser";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";

export default function HasPrimaryDetails({ children }) {
    const loggedInUser = useSelector((state) => state.stateUser.user);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();

    const refInputName = useRef();
    const refInputPhone = useRef();
    const navigate = useNavigate();

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
                <div className="flex justify-content-center align-items-center w-full h-screen">
                    <div className="p-4 border-round shadow-2 w-10 sm:w-8 md:w-6">
                        <h2 className="text-center text-base">Basic Information Needed to Purchase</h2>
                        <Divider />
                        <p className="text-center text-xs mb-4">
                            Please provide the following details to proceed with your purchase.
                        </p>

                        <div className="gap-3">
                            <label htmlFor="name" className="block text-sm text-900 font-medium mb-2">
                                <i className="pi pi-user text-sm text-indigo-500 mr-2"></i>Name
                            </label>
                            <InputText
                                ref={refInputName}
                                disabled={loading || loggedInUser.name}
                                placeholder={loggedInUser.name || "Enter your name"}
                                className="w-full"
                            />

                            <label htmlFor="phone" className="block text-sm text-900 font-medium mb-2 mt-3">
                                <i className="pi pi-phone text-sm text-indigo-500 mr-2"></i>Phone
                            </label>
                            <InputText
                                ref={refInputPhone}
                                disabled={loading || loggedInUser.phone}
                                placeholder={loggedInUser.phone || "Enter your phone number"}
                                className="w-full"
                            />

                            <div className="flex justify-content-between mt-4">
                                <Button
                                    label="Back"
                                    className="p-button-secondary text-sm"
                                    onClick={() => navigate(-1)}
                                />
                                <Button
                                    label="Update"
                                    onClick={updatePrimaryDetails}
                                    className="p-button text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
