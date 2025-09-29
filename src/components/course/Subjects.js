import { useOutletContext } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";
import { Tag } from "primereact/tag";
import TabHeader from "../common/TabHeader";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";

export default function Subjects() {
    const { id, image, enrollment, subjects } = useOutletContext();

    const items = [{ label: "Components" }, { label: "Form" }];

    const home = { icon: "pi pi-home", url: "https://primereact.org" };

    const [updating, setUpdating] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    //fetch course detail - if it subscribe or not
    //validity
    //give a button redirect to invoices if subscribed a course
    //fetch subjects
    //need to show subjects count
    //show course->subjects->chapters->videos,pdfs,audios
    //Buy Button

    const { requestAPI, showToast } = useAppContext();

    const [dialogAddSubject, setDialogAddSubject] = useState({
        visible: false,
    });

    const closeDialogAddSubject = useCallback(() => {
        setDialogAddSubject((prev) => ({ ...prev, visible: false }));
    }, []);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `subjects/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: subjects.map(({ id }, view_index) => ({ id, view_index })),
            setUpdating: setUpdating,
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
                className={"px-3 pt-2"}
                title="Subjects"
                highlights={[`Total ${subjects?.length} Subjects`]}
                actionItems={[
                    <Button
                        onClick={() => setDialogAddSubject((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddSubject }))}
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
        </div>
    );
}
