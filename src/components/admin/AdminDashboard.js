import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'primereact/badge';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const sections = [
       
        { icon: 'pi pi-users', label: 'App Users', route: 'app-users', badge: 17471 },
        { icon: 'pi pi-credit-card', label: 'Transactions', route: 'transactions', badge: '12967' },
        { icon: 'pi pi-mobile', label: 'Device Requests', route: 'device-requests', badge: 0 },
        { icon: 'pi pi-percentage', label: 'Promo Codes', route: 'promo-codes', badge: 1 },
        { icon: 'pi pi-lock', label: 'User Product Access', route: 'user-product-access' },
        { icon: 'pi pi-credit-card', label: 'Website Transaction', route: 'website-transaction' },
        { icon: 'pi pi-desktop', label: 'Website Product Access', route: 'website-product-access' },
        { icon: 'pi pi-briefcase', label: 'Admission Details', route: 'admission-details', badge: 2 },
    ];

    return (
        <div className="flex flex-wrap justify-content-center gap-4 my-4">
            {sections.map(({ icon, label, route, badge }) => (
                <div
                    key={route + label}
                    className="relative flex flex-column align-items-center justify-content-center cursor-pointer w-4 surface-card border-round shadow-2 p-4"
                    onClick={() => navigate(route)}
                >
                    {/* Badge Positioned Relative to Card */}
                    {badge !== undefined && (
                        <Badge
                            value={badge}
                            severity="info"
                            className="absolute top-0 right-0 m-2 text-xs"
                        />
                    )}

                    <i className={`${icon} text-4xl text-primary-500 mb-2`} />
                    <div className="font-medium text-xs text-center mt-2">{label}</div>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;
