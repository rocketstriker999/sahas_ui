import { ListBox } from "primereact/listbox";
import { useEffect, useState } from "react";
import { requestAPI } from "../../../utils/utils";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Card } from 'primereact/card';
import productStyle from './notifications.module.css'
import { classNames } from "primereact/utils";

export default function Notifications() {
    const [notifications, setNotifications] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: "users/notifications",
            onResponseReceieved: (notifications, responseCode) => {
                if (notifications && responseCode === 200) {
                    setNotifications(notifications);
                }
            },
            setLoading: setLoading,
        });
    }, []);

    return (
        <div>
            <ScrollPanel style={{ width: '100%', height: '80vh' }} className={`${productStyle.custombar1}`}
                pt={{
                    barY: classNames("bg-primary-700"),
                }}>
                <ListBox
                    focusOnHover={false}
                    options={notifications}
                    optionLabel="name"
                    className="w-full"

                    pt={{
                        root: classNames("border-0"),
                        item: classNames(`p-1 m-0 ${productStyle.notification_card} cursor-auto`),
                        wrapper: classNames("overflow-visible"),
                    }}
                    itemTemplate={(item) => (
                        <div className="mb-3">
                            <Card
                                title={<h4 className="font-bold text-sm mb-1 mt-1">{item.title}</h4>}
                                className="shadow-2 surface-card border-round p-2 border-1 border-100"
                                pt={{
                                    body: classNames("p-0"),
                                    content: classNames("p-0 text-xs"),
                                }}
                            >
                                <p>{item.description}</p>
                            </Card>
                        </div>
                    )}
                />
            </ScrollPanel>
        </div>
    );
}
