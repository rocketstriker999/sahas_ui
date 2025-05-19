import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';

const Admin = () => {
    const navigate = useNavigate();
    const { name, email } = useSelector((state) => state.stateUser.user || {});

    return (
        <>
            {/* Header */}
            <div className="flex bg-primary-800 align-items-center justify-content-between px-3 py-2">
                <div className="flex align-items-center gap-3 text-white">
                    <Avatar label={name?.[0]?.toUpperCase() || 'S'} size="large" className="bg-white text-primary font-bold" />
                    <div>
                        <div className="font-bold">{name || 'Hello User'}</div>
                        <div className="text-xs sm:text-sm text-white-alpha-70">{email}</div>
                    </div>
                </div>
                <Button
                    className="p-button-text p-0"
                    onClick={() => navigate(-1)}
                    aria-label="Close"
                >
                    <i className="pi pi-times text-xl text-white" />
                </Button>
            </div>

            

            <Outlet />
        </>
    );
};

export default Admin;
