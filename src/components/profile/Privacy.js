import React from 'react';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';

const Privacy = () => {
    return (
        <div className="flex flex-column align-items-center w-12 sm:w-10 md:w-8">
            <p className="text-xs sm:text-sm text-secondary text-center mb-3">
                Manage your privacy preferences and settings here.
            </p>
            {/* Privacy Preferences */}
            <Panel header="Privacy Preferences" className="w-full mt-3">
                <div className="flex flex-column gap-3">
                    {/* Data Sharing */}
                    <div className="flex flex-column">
                        <label htmlFor="data-sharing" className="text-sm font-semibold mb-2">Data Sharing:</label>
                        <div className="p-inputtext p-component surface-border w-full py-2 px-3 border-round">
                            <p className="text-xs sm:text-sm m-0">
                                You are currently <span className="font-semibold">sharing data with third-party services</span>.
                            </p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="flex flex-column">
                        <label htmlFor="notifications" className="text-sm font-semibold mb-2">Notifications:</label>
                        <div className="p-inputtext p-component surface-border w-full py-2 px-3 border-round">
                            <p className="text-xs sm:text-sm m-0">
                                You have <span className="font-semibold">email notifications enabled</span> for important updates.
                            </p>
                        </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="flex flex-column">
                        <label htmlFor="two-factor" className="text-sm font-semibold mb-2">Two-Factor Authentication:</label>
                        <div className="p-inputtext p-component surface-border w-full py-2 px-3 border-round">
                            <p className="text-xs sm:text-sm m-0">
                                Your account is <span className="font-semibold">protected with two-factor authentication</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default Privacy;
