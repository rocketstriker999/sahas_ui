import React from 'react';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { classNames } from 'primereact/utils';

const Notification = () => {
    const notifications = [
        { id: 1, message: 'You have a new message from John Doe.', timestamp: '2 minutes ago' },
        { id: 2, message: 'Your password was successfully updated.', timestamp: '1 hour ago' },
        { id: 3, message: 'A new comment has been posted on your profile.', timestamp: '5 hours ago' },
    ];

    return (
        <div className="flex flex-column align-items-center w-full">
            <p className="text-xs mb-3 text-center">Stay updated with your latest notifications.</p>
            <Panel header="Recent Notifications" className="w-full mt-1"
            pt={{
                content: classNames("p-0")
            }}>
                <div className="flex flex-column">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex flex-column surface-border p-3 border-round-lg bg-white"
                        >
                            <p className="text-sm font-semibold m-0">{notification.message}</p>
                            <span className="text-xs text-secondary">{notification.timestamp}</span>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
};

export default Notification;
