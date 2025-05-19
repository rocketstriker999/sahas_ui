import React from 'react';
import NewCarouselHeader from './NewCarouselHeader';

const quickAccessItems = [
    { icon: 'pi pi-users', label: 'App Users', color: 'bg-pink-100 text-pink-600' },
    { icon: 'pi pi-credit-card', label: 'Transactions', color: 'bg-cyan-100 text-cyan-600' },
    { icon: 'pi pi-credit-card', label: 'Website Transaction', color: 'bg-orange-100 text-orange-600' },
    { icon: 'pi pi-mobile', label: 'Device Requests', color: 'bg-purple-100 text-purple-600' },
    { icon: 'pi pi-percentage', label: 'Promo Codes', color: 'bg-bluegray-100 text-bluegray-600' },
    { icon: 'pi pi-lock', label: 'User Product Access', color: 'bg-teal-100 text-teal-600' },
    { icon: 'pi pi-desktop', label: 'Website Product Access', color: 'bg-indigo-100 text-indigo-600' },
    { icon: 'pi pi-briefcase', label: 'Admission Details', color: 'bg-yellow-100 text-yellow-600' },
];

const Test = () => {
    return (
        <>
            <NewCarouselHeader />
            <div className="p-4 bg-blue-50">
                <div className="mb-4 p-3 border-round-xl shadow-2 bg-white flex align-items-center gap-2">
                    <i className="pi pi-cog text-pink-500 text-2xl" />
                    <h2 className="m-0 text-xl md:text-2xl font-semibold text-gray-800">Quick Manage</h2>
                </div>
                <div className="grid">
                    {quickAccessItems.map((item, index) => (
                        <div key={index} className="col-4">
                            <div className="surface-card h-full p-3 border-round-3xl shadow-4 flex flex-column align-items-center justify-content-center text-center hover:shadow-6">
                                <div className={`flex align-items-center justify-content-center border-circle mb-3 ${item.color} w-3rem h-3rem`}>
                                    <i className={`${item.icon} text-2xl`} />
                                </div>
                                <span className="text-xs font-bold text-gray-800">{item.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Test;
