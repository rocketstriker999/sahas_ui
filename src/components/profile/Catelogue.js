import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const Catelogue = () => {
    const navigate = useNavigate();

    const sections = [
        {
            icon: 'pi pi-id-card',
            label: 'Primary Details',
            route: 'primary-details',
        },
        {
            icon: 'pi pi-book',
            label: 'Course Details',
            route: 'product-access',
        },
        {
            icon: 'pi pi-calendar',
            label: 'Attendance',
            route: '',
        },
        {
            icon: 'pi pi-bell',
            label: 'Global Notes',
            route: 'global-notes',
        }
    ];

    return (
        <>
        {/* Navigation Section with Flex layout */}
        <div className="flex flex-wrap justify-content-center gap-4 my-4">
            {sections.map(({ icon, label, route }) => (
                <div
                    key={route}
                    className="flex flex-column align-items-center cursor-pointer w-5"
                    onClick={() => navigate(route)}
                >
                    <i className={`${icon} text-4xl text-primary-500 mb-2`} />
                    <div className="font-medium text-sm text-center">{label}</div>
                </div>
            ))}
        </div>
    </>
    );
};

export default Catelogue;
