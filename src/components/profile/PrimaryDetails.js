import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useSelector } from "react-redux";

const PrimaryDetails = () => {
    const [initialData, setInitialData] = useState({});
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', parentPhone: '', wallet: '', branch: '', address: '', area: '', city: '', lastSchool: '', accountCreatedOn: '' });
    const [isChanged, setIsChanged] = useState(false);

    const fields = [
        { label: "Name", field: "name", editable: true },
        { label: "Email Address", field: "email", editable: false },
        { label: "Phone", field: "phone", editable: true },
        { label: "Parent's Phone", field: "parentPhone", editable: true },
        { label: "Wallet Amount", field: "wallet", editable: false },
        { label: "Branch", field: "branch", editable: false },
        { label: "Address", field: "address", editable: true },
        { label: "Area", field: "area", editable: true },
        { label: "City", field: "city", editable: true },
        { label: "Last School Attended", field: "lastSchool", editable: false },
        { label: "Account Created On", field: "accountCreatedOn", editable: false }
    ];
    // For now using dummy data - replace this with actual GET API in future
    useEffect(() => {
        const dummyUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '9876543210',
            parentPhone: '9123456780',
            wallet: '150.75',
            branch: 'Main Branch',
            address: '123 Main Street',
            area: 'Central Park',
            city: 'Metropolis',
            lastSchool: 'Springfield High School',
            accountCreatedOn: '2024-12-25 15:35:38'
        };

        setInitialData(dummyUser);
        setFormData(dummyUser);
    }, []);

    // Check if any editable fields are modified
    useEffect(() => {
        const editableFields = ['name', 'phone', 'parentPhone', 'address', 'area', 'city'];
        const changed = editableFields.some(key => formData[key] !== initialData[key]);
        setIsChanged(changed);
    }, [formData, initialData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCancel = () => {
        setFormData(initialData);
    };

    const handleUpdate = () => {
        // TODO: Replace this with actual POST API call
        console.log('Updating user details...', formData);

        // After successful update, update initialData to new values
        setInitialData(formData);
        setIsChanged(false);
    };

    return (
        <div className="flex flex-column gap-4 p-4 surface-0">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">
                User Primary Details
            </h2>

            {fields.map(({ label, field, editable }) => (
                <div key={field}>
                    <label className="text-sm font-semibold mb-1 block">{label}:</label>
                    <InputText
                        value={formData[field]}
                        onChange={(e) => editable && handleChange(field, e.target.value)}
                        disabled={!editable}
                        className="w-full text-sm font-semibold"
                    />
                </div>
            ))}

            <div className="flex gap-3 pt-2">
                <Button label="Update" severity="info" className="p-2 text-xs sm:text-sm" raised disabled={!isChanged} onClick={handleUpdate} />
                <Button label="Cancel" severity="danger" className="p-2 text-xs sm:text-sm" raised onClick={handleCancel} disabled={!isChanged} />
            </div>
        </div>
    );
};

export default PrimaryDetails;
