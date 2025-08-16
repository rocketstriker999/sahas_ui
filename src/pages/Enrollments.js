import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import TabHeader from "../components/manage_users/user/TabHeader";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { Panel } from "primereact/panel";
import Detail from "../components/common/Detail";
import { InputSwitch } from "primereact/inputswitch";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";
import { RUPEE } from "../constants";

export default function Enrollments() {
    const { userId, authorities, branches } = useOutletContext();
    const [enrollments, setEnrollments] = useState();
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}/enrollments`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (enrollments, responseCode) => {
                if (enrollments && responseCode === 200) {
                    setEnrollments(enrollments);
                } else {
                    setError("Couldn't load Enrollments");
                }
            },
        });
    }, [requestAPI, userId]);

    return (
        <div>
            <TabHeader
                className={"px-3 pt-3"}
                title="User's Enrollments"
                highlightOne={`Total - ${enrollments?.length} Enrollments`}
                actionItems={[<Button icon="pi pi-plus" severity="warning" />]}
            />

            <Divider />
            <div className="px-3">
                {loading ? (
                    <Loading message="Loading Enrollments" />
                ) : error ? (
                    <NoContent error={error} />
                ) : enrollments?.length ? (
                    enrollments.map((enrollment) => (
                        <Panel
                            key={enrollment?.id}
                            headerTemplate={(options) => (
                                <div className={`${options.className} justify-content-space-between`}>
                                    <Detail title={`Created at ${enrollment?.created_on}`} value={`Enrollment #${enrollment?.id}`} />
                                    {options.togglerElement}
                                </div>
                            )}
                            footerTemplate={(options) => {
                                return (
                                    <div className={`${options.className} flex  align-items-center justify-content-between gap-3`}>
                                        <span className="p-text-secondary text-xs">Updated at {enrollment?.updated_at}</span>
                                        <div className=" flex align-items-center gap-2">
                                            <span className="flex-1 text-xs">Active</span>
                                            <InputSwitch checked={Boolean(enrollment?.active)} />
                                        </div>
                                    </div>
                                );
                            }}
                            toggleable
                        >
                            <div className="flex flex-column gap-3">
                                <div className="flex align-items-center justify-content-between">
                                    <Detail icon="pi pi-calendar" title="Start Date" value={enrollment?.start_date} />
                                    <Detail icon="pi pi-calendar" title="End Date" value={enrollment?.end_date} />
                                </div>
                                <Divider className="m-0 p-0" />

                                <div className="flex align-items-center justify-content-between">
                                    <Detail title="Total" value={enrollment?.total.concat(RUPEE)} />
                                    <Detail title="Paid" value={"0".concat(RUPEE)} />
                                    <Detail title="Due" value={"0".concat(RUPEE)} />
                                    <Tag className="p-overlay-badge" icon="pi pi-indian-rupee" severity="warning" value="Transactions">
                                        <Badge value={enrollment?.transcations?.length}></Badge>
                                    </Tag>
                                </div>

                                <Divider className="m-0 p-0" />

                                <div className="flex align-items-center gap-1">
                                    <Badge value={enrollment?.courses?.length} severity={"warning"}></Badge>
                                    <span>Courses</span>
                                </div>

                                {enrollment?.course?.length ? (
                                    enrollment.courses.map((course) => (
                                        <div key={course?.id} className="flex align-items-start gap-2 mb-2">
                                            <Detail icon="pi pi-angle-right" className="flex-1 mb-2" title={`Course #${course?.id}`} value={course?.title} />
                                            <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" />
                                        </div>
                                    ))
                                ) : (
                                    <NoContent error="No Courses Assigned" />
                                )}
                            </div>
                        </Panel>
                    ))
                ) : (
                    <NoContent error={"No Enrollments Found"} />
                )}
            </div>
        </div>
    );
}
