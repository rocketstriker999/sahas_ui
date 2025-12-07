import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import TabHeader from "../../common/TabHeader";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import Enrollment from "./enrollments/Enrollment";
import { Accordion, AccordionTab } from "primereact/accordion";
import DialogAddEnrollment from "./enrollments/DialogAddEnrollment";
import EnrollmentHead from "./enrollments/EnrollmentHead";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";

export default function Enrollments() {
    const { userId } = useOutletContext();
    const [enrollments, setEnrollments] = useState();
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [dialogAddEnrollment, setDialogAddEnrollment] = useState({
        visible: false,
    });

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

    const closeDialogAddEnrollment = useCallback(() => {
        setDialogAddEnrollment((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader
                className={"px-3 pt-3"}
                title="User's Enrollments"
                highlights={[`Total - ${enrollments?.length} Enrollments`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_OTHER_USERS}>
                        <Button
                            icon="pi pi-plus"
                            severity="warning"
                            onClick={() =>
                                setDialogAddEnrollment((prev) => ({
                                    ...prev,
                                    visible: true,
                                    closeDialog: closeDialogAddEnrollment,
                                }))
                            }
                        />
                    </HasRequiredAuthority>,
                ]}
            />
            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Enrollments" />
                ) : error ? (
                    <NoContent error={error} />
                ) : enrollments?.length ? (
                    <Accordion>
                        {enrollments.map((enrollment, index) => (
                            <AccordionTab
                                pt={{
                                    content: { className: "p-0" },
                                }}
                                key={enrollment?.id}
                                header={() => <EnrollmentHead {...enrollment} index={enrollments.length - index} />}
                            >
                                <Enrollment setEnrollments={setEnrollments} key={index} index={index} {...enrollment} />
                            </AccordionTab>
                        ))}
                    </Accordion>
                ) : (
                    <NoContent error={"No Enrollments Found"} />
                )}
            </div>
            <DialogAddEnrollment {...dialogAddEnrollment} setEnrollments={setEnrollments} />
        </div>
    );
}
