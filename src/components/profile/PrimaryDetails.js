import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from "react-redux";
import { requestAPI } from "../../utils";
import { setCurrentUser } from "../../redux/sliceUser";

// Static configuration moved outside component
const editableFields = ['name', 'phone', 'address'];
const fields = [
    { label: "Name", field: "name", editable: true },
    { label: "Email Address", field: "email", editable: false },
    { label: "Phone", field: "phone", editable: true },
    // { label: "Parent's Phone", field: "parentPhone", editable: true },
    { label: "Wallet Amount", field: "wallet", editable: false },
    { label: "Branch", field: "branch", editable: false },
    { label: "Address", field: "address", editable: true },
    // { label: "Area", field: "area", editable: true },
    // { label: "City", field: "city", editable: true },
    { label: "Last School", field: "lastSchool", editable: false },
    { label: "Last Tution Class", field: "lastTutionClass", editable: false },
    { label: "Account Created On", field: "created_on", editable: false }
];

const PrimaryDetails = () => {
    const [initialData, setInitialData] = useState({});
    const [formData, setFormData] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    const loggedInUser = useSelector((state) => state.stateUser.user);
    const dispatch = useDispatch();

    // Single API call on mount
    useEffect(() => {
        if (!loggedInUser?.id) return;

        const fetchUserDetails = async () => {
            await requestAPI({
                requestMethod: "GET",
                requestPath: `users/profile/${loggedInUser.id}/get-details`,
                setLoading: setLoading,
                onResponseReceieved: (user, responseCode) => {
                    if (responseCode === 200 && user) {
                        setInitialData(user);
                        setFormData(user);
                        // Update Redux only if different
                        if (JSON.stringify(user) !== JSON.stringify(loggedInUser)) {
                            dispatch(setCurrentUser(user));
                        }
                    }
                }
            });
        };

        fetchUserDetails();
    }, [loggedInUser?.id, dispatch]);

    // Check for changes in editable fields
    useEffect(() => {
        const hasChanges = editableFields.some(key => formData[key] !== initialData[key]);
        setIsChanged(hasChanges);
    }, [formData, initialData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCancel = () => {
        setFormData(initialData);
    };

    const handleUpdate = () => {
        // Create payload with only editable fields
        const payload = Object.fromEntries(
        editableFields.map(key => [key, formData[key]])
    );
        

        requestAPI({
            requestMethod: "PATCH",
            requestPath: `users/profile/${loggedInUser.id}/update-details`,
            requestPostBody: payload,
            setLoading: setLoading,
            onResponseReceieved: (user, responseCode) => {
                if (responseCode === 200 && user) {
                    setInitialData(user);
                    setFormData(user);
                    dispatch(setCurrentUser(user));
                }
            }
        });
    };

    return (
        <div className="flex flex-column gap-4 p-4 surface-0">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">
                User Primary Details
            </h2>

            {fields.map(({ label, field, editable }) => (
                <div key={field}>
                    <label className="text-xs md:text-sm font-semibold mb-1 block">{label}:</label>
                    <InputText
                        value={formData?.[field] || ''}
                        onChange={(e) => editable && handleChange(field, e.target.value)}
                        disabled={!editable || loading}
                        className="w-full text-xs md:text-sm font-semibold"
                    />
                </div>
            ))}

            <div className="flex gap-3 pt-2">
                <Button
                    label="Update"
                    severity="info"
                    className="p-2 text-xs sm:text-sm"
                    raised
                    disabled={!isChanged || loading}
                    onClick={handleUpdate}
                    loading={loading}
                />
                <Button
                    label="Cancel"
                    severity="danger"
                    className="p-2 text-xs sm:text-sm"
                    raised
                    onClick={handleCancel}
                    disabled={!isChanged || loading}
                />
            </div>
        </div>
    );
};

export default PrimaryDetails;