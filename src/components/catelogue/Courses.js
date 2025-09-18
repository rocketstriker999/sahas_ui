import { useOutletContext, useParams } from "react-router-dom";
import TabHeader from "../common/TabHeader";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import OrderManager from "../common/OrderManager";
import Course from "./Course";
import DialogAddCourse from "./DialogAddCourse";

export default function Courses() {
    const { categories } = useOutletContext();
    const { categoryId } = useParams();
    const { requestAPI, showToast } = useAppContext();
    const [updating, setUpdating] = useState();
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const category = categories?.find(({ id }) => id == categoryId);

    const [courses, setCourses] = useState();

    const [dialogAddCourse, setDialogAddCourse] = useState({
        visible: false,
    });

    const closeDialogAddCourse = useCallback(() => {
        setDialogAddCourse((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: `course-categories/${categoryId}/courses`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (courses, responseCode) => {
                if (courses && responseCode === 200) {
                    setCourses(courses);
                } else {
                    setError("Couldn't load Courses");
                }
            },
        });
    }, [categories, categoryId, requestAPI]);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `courses/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: categories.map(({ id }, view_index) => ({ id, view_index })),
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
    }, [categories, requestAPI, showToast]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column">
            <TabHeader
                className={"px-3 pt-3"}
                title={category?.title}
                highlights={[`Explore Below ${category?.courses_count} Courses`]}
                actionItems={[
                    <Button
                        onClick={() => setDialogAddCourse((prev) => ({ ...prev, visible: true, closeDialog: closeDialogAddCourse, categoryId }))}
                        icon="pi pi-plus"
                        severity="warning"
                    />,
                    <Button
                        loading={updating}
                        disabled={!categories?.length}
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

            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : courses?.length ? (
                <OrderManager
                    updatingViewIndex={updatingViewIndex}
                    items={courses}
                    setItems={setCourses}
                    itemTemplate={(item) => <Course {...item} updatingViewIndex={updatingViewIndex} />}
                />
            ) : (
                <NoContent error={"No Courses Found"} />
            )}
            <DialogAddCourse {...dialogAddCourse} />
        </div>
    );
}
