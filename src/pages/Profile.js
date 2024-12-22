import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import UserAccount from '../components/profile/UserAccount';
import Privacy from '../components/profile/Privacy';
import Notification from '../components/profile/Notification';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from 'primereact/button';

const Profile = () => {
    const [expandedIndex, setExpandedIndex] = useState(null); // Track which panel is expanded
    const navigate = useNavigate(); // Initialize navigate hook

    const items = [
        { label: 'Profile', component: <UserAccount /> },
        { label: 'Privacy', component: <Privacy /> },
        { label: 'Notification', component: <Notification /> },
    ];

    return (
        <>
            <div className="flex flex-column p-4 relative">
                <div className="flex mb-5 align-items-center justify-content-between">
                    {/* User Info */}
                    <div className="flex align-items-center gap-3">
                        <Avatar label="A" size="large" />
                        <div>
                            <div className="font-bold">Abhishek Jadav</div>
                            <div className="text-xs text-secondary">abhijadav99@gmail.com</div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <Button
                        className="p-button-text p-0"
                        onClick={() => navigate(-1)} // Navigate back on click
                        aria-label="Close"
                    >
                        <i className="pi pi-times text-xl text-gray-500"></i>
                    </Button>
                </div>


                {/* Panels */}
                {items.map((item, index) => (
                    <Panel
                        key={index}
                        header={item.label}
                        toggleable
                        collapsed={expandedIndex !== index} // Collapse if not the expanded index
                        onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)} // Toggle the current panel
                        className="mb-3"
                        pt={{
                            content: classNames('p-2'),
                        }}
                    >
                        <div>{item.component}</div>
                    </Panel>
                ))}
            </div>
        </>
    );
};

export default Profile;
