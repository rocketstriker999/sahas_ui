import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const UserAccount = () => {
    const [isEditing, setIsEditing] = useState({ name: false, email: false });
    const [name, setName] = useState("Abhishek Jadav");
    const [email, setEmail] = useState("abhishek.jadav@tcs.com");

    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <div className="flex flex-column align-items-center w-full">
            <p className="text-xs text-secondary mb-3 text-center">
                Manage and update your personal information and preferences in your profile.
            </p>
            <Panel header="Basic Information" className="w-full" 
                pt={{ header: 'text-sm' }}>
                <div className="flex flex-column gap-2">
                    {/* Name Section */}
                    <div className="flex flex-column">
                        <label className="text-sm font-semibold mb-1">Name:</label>
                        <div className="flex align-items-center">
                            {isEditing.name ? (
                                <InputText
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="p-inputtext w-full py-2 px-3 border-round text-xs font-semibold m-0"
                                />
                            ) : (
                                <div className="p-inputtext w-full py-2 px-3 border-round">
                                    <p className="text-xs font-semibold m-0">{name}</p>
                                </div>
                            )}
                            <Button
                                icon={`pi ${isEditing.name ? 'pi-check' : 'pi-pencil'}`}
                                className="p-button-text p-button-sm px-0"
                                onClick={() => toggleEdit('name')}
                                tooltip={isEditing.name ? 'Save' : 'Edit'}
                            />
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="flex flex-column">
                        <label className="text-sm font-semibold mb-2">Email:</label>
                        <div className="flex align-items-center">
                            {isEditing.email ? (
                                <InputText
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="p-inputtext w-full py-2 px-3 border-round text-xs font-semibold m-0"
                                />
                            ) : (
                                <div className="p-inputtext w-full py-2 px-3 border-round">
                                    <p className="text-xs font-semibold m-0">{email}</p>
                                </div>
                            )}
                            <Button
                                icon={`pi ${isEditing.email ? 'pi-check' : 'pi-pencil'}`}
                                className="p-button-text p-button-sm px-0"
                                onClick={() => toggleEdit('email')}
                                tooltip={isEditing.email ? 'Save' : 'Edit'}
                            />
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default UserAccount;
