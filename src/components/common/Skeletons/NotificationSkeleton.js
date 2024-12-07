import { ScrollPanel } from "primereact/scrollpanel";
import { Skeleton } from "primereact/skeleton";
import { classNames } from "primereact/utils";

export default function NotificationSkeleton() {
    return (
        <div>
            <ScrollPanel
                style={{ width: '100%', height: '80vh' }}
                className="custombar1"
                pt={{
                    barY: classNames("bg-primary-700"),
                }}
            >
                <div className="w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className="mb-3" key={index}>
                            <div className="shadow-2 surface-card border-round p-2 border-1 border-100">
                                <div className="mb-1 mt-1">
                                    <Skeleton width="60%" height="1rem" className="mb-2" />
                                </div>
                                <div className="p-0 text-xs">
                                    <Skeleton width="80%" height="0.75rem" className="mb-2" />
                                    <Skeleton width="70%" height="0.75rem" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollPanel>
        </div>
    );
};
