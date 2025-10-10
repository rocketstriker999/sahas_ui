import { useOutletContext } from "react-router-dom";

import TabHeader from "../common/TabHeader";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import OrderManager from "../common/OrderManager";
import Subject from "./Subject";
import DialogAddSubject from "./DialogAddSubject";

export default function Subjects() {
    const { id, image, enrollment, ...props } = useOutletContext();

    const [subjects, setSubjects] = useState(props?.subjects);

    const [updating, setUpdating] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    //give a button redirect to invoices if subscribed a course

    //show course->subjects->chapters->videos,pdfs,audios

    const { requestAPI, showToast } = useAppContext();

    const [dialogAddSubject, setDialogAddSubject] = useState({
        courseId: id,
        visible: false,
    });

    const closeDialogAddSubject = useCallback(() => {
        setDialogAddSubject((prev) => ({ ...prev, visible: false }));
    }, []);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `course-subjects/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: subjects.map(({ id }, view_index) => ({ id, view_index })),
            setLoading: setUpdating,
            parseResponseBody: false,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update View Indexes !", life: 2000 }),
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 200) {
                    showToast({
                        severity: "success",
                        summary: "Updated",
                        detail: `View Indexes Updated`,
                        life: 1000,
                    });
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Update View Indexes !", life: 2000 });
                }
            },
        });
    }, [subjects, requestAPI, showToast]);

    return (
        <div>
            <TabHeader
                className={"px-3"}
                title="Subjects"
                highlights={[`Total ${subjects?.length} Subjects`]}
                actionItems={[
                    <Button
                        onClick={() => setDialogAddSubject((prev) => ({ ...prev, visible: true, setSubjects, closeDialog: closeDialogAddSubject }))}
                        icon="pi pi-plus"
                        severity="warning"
                    />,
                    <Button
                        loading={updating}
                        disabled={!subjects?.length}
                        onClick={() => {
                            showToast({
                                severity: "info",
                                summary: "Repositioning",
                                detail: `Repositioning Mode ${!updatingViewIndex ? "Enabled" : "Disabled"}`,
                                life: 1000,
                            });
                            //give signal to update view indexs
                            if (!!updatingViewIndex) {
                                updateViewIndexs();
                            }
                            setUpdatingViewIndex((prev) => !prev);
                        }}
                        icon="pi pi-list"
                    />,
                ]}
            />
            <Divider />

            <OrderManager
                updatingViewIndex={updatingViewIndex}
                items={subjects}
                setItems={setSubjects}
                emptyItemsError="No Subjects Found"
                itemTemplate={(item) => <Subject setSubjects={setSubjects} {...item} updatingViewIndex={updatingViewIndex} />}
            />

            <DialogAddSubject {...dialogAddSubject} />
        </div>
    );
}
