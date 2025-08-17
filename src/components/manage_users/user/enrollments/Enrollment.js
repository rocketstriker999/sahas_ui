import { InputSwitch } from "primereact/inputswitch";
import { Tag } from "primereact/tag";
import { useCallback, useState } from "react";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import Detail from "../../../common/Detail";
import TabHeader from "../TabHeader";
import NoContent from "../../../common/NoContent";
import { RUPEE } from "../../../../constants";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import Loading from "../../../common/Loading";
import { getFormattedDate } from "../../../../utils";

export default function Enrollment({ getCourseTitle, setEnrollments, index, setAddingNewCourse, ...enrollment }) {
    const [loading, setLoading] = useState();

    const { requestAPI, showToast } = useAppContext();

    const updateEnrollment = useCallback(
        (updatedKeys) => {
            requestAPI({
                requestPath: `enrollments/${enrollment?.id}`,
                requestMethod: "PUT",
                requestPostBody: { ...enrollment, ...updatedKeys },
                setLoading: setLoading,
                onResponseReceieved: (enrollment, responseCode) => {
                    if (enrollment && responseCode === 200) {
                        showToast({ severity: "success", summary: "Updated", detail: "Enrollment Updated Succesfully", life: 1000 });
                        setEnrollments((prev) => {
                            prev[index] = { ...prev[index], ...enrollment };
                            return [...prev];
                        });
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Updated Enrollment !", life: 2000 });
                    }
                },
            });
        },
        [enrollment, index, requestAPI, setEnrollments, showToast]
    );

    return loading ? (
        <Loading />
    ) : (
        <div className="flex flex-column gap-3">
            <div className="flex align-items-center justify-content-between	">
                <Detail icon="pi pi-calendar" title="Start Date" value={getFormattedDate({ date: enrollment?.start_date, removeTime: true })} />
                <Detail icon="pi pi-calendar" title="End Date" value={getFormattedDate({ date: enrollment?.end_date, removeTime: true })} />
                <Detail value={<InputSwitch checked={Boolean(enrollment?.active)} onChange={(e) => updateEnrollment({ active: e.value })} />} />
            </div>
            <Divider className="m-0 p-0" />

            <TabHeader
                title="Enrollment Transactions"
                highlights={[`Total - ${enrollment?.transactions?.length} Transactions`]}
                actionItems={[<Tag key="transactions-tag" icon="pi pi-indian-rupee" value="Transcations"></Tag>]}
            />

            <div className="flex align-items-center justify-content-evenly">
                <Detail title="Total" value={enrollment?.total.concat(RUPEE)} />
                <Detail title="Paid" value={"0".concat(RUPEE)} />
                <Detail title="Due" value={"0".concat(RUPEE)} />
            </div>

            <Divider className="m-0 p-0" />

            <TabHeader
                title="Enrollment Courses"
                highlights={[`Total - ${enrollment?.courses?.length} Enrollments`]}
                actionItems={[<Tag icon="pi pi-plus" value="Add Course" onClick={() => setAddingNewCourse(enrollment?.id)}></Tag>]}
            />

            {enrollment?.courses?.length ? (
                enrollment.courses.map((course) => (
                    <div key={course?.id} className="flex align-items-start gap-2 mb-2">
                        <Detail
                            icon="pi pi-angle-right"
                            className="flex-1 mb-2"
                            title={`By ${course?.created_by_full_name} at ${getFormattedDate({ date: course?.created_on })}`}
                            value={getCourseTitle(course?.id)}
                        />
                        <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" />
                    </div>
                ))
            ) : (
                <NoContent error="No Courses Assigned" />
            )}
        </div>
    );
}
