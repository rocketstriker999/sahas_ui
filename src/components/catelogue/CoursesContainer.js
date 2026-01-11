import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import ProgressiveControl from "../common/ProgressiveControl";
import { useNavigate } from "react-router-dom";
import IconButton from "../common/IconButton";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES, RUPEE } from "../../constants";
import { Divider } from "primereact/divider";
import NoContent from "../common/NoContent";
import { getViewIndex } from "../../utils";
import { Button } from "primereact/button";

export default function CoursesContainer({
    id,
    title,
    fees,
    image,
    setCoursesContainers,
    updatingViewIndex,
    setDialogAddCourse,
    setDialogEditCoursesContainer,
    courses,
}) {
    const navigate = useNavigate();

    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();

    const deleteCoursesContainer = useCallback(() => {
        requestAPI({
            requestPath: `courses-containers/${id}`,
            requestMethod: "DELETE",
            setLoading: setDeleting,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({
                        severity: "success",
                        summary: "Deleted",
                        detail: `Course Deleted`,
                        life: 1000,
                    });
                    setCoursesContainers((prev) => prev?.filter((coursesContainer) => coursesContainer?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Course !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setCoursesContainers, showToast]);

    return (
        <div className="border-1 border-gray-300 border-round flex flex-column gap-2 overflow-hidden pb-2">
            <img className="w-full h-6rem" src={image} alt={title} />

            <div className="flex align-items-center mt-1 px-3 gap-3">
                <span className="font-semibold text-orange-800 flex-1">{title}</span>

                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                    {!updatingViewIndex && (
                        <IconButton
                            icon={"pi-plus"}
                            color={"text-indigo-500"}
                            onClick={() => {
                                setDialogAddCourse((prev) => ({
                                    ...prev,
                                    visible: true,
                                    coursesContainerId: id,
                                    coursesContainerTitle: title,
                                    view_index: getViewIndex(courses),
                                }));
                            }}
                        />
                    )}
                </HasRequiredAuthority>
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                    {!updatingViewIndex && <ProgressiveControl loading={deleting} control={<IconButton icon={"pi-list-check"} color={"text-blue-500"} />} />}
                </HasRequiredAuthority>

                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                    {!updatingViewIndex && (
                        <ProgressiveControl
                            loading={deleting}
                            control={
                                <IconButton
                                    icon={"pi-pencil"}
                                    color={"text-orange-500"}
                                    onClick={() =>
                                        setDialogEditCoursesContainer((prev) => ({
                                            ...prev,
                                            visible: true,
                                            id,
                                            title,
                                            fees,
                                            image,
                                        }))
                                    }
                                />
                            }
                        />
                    )}
                </HasRequiredAuthority>
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                    {!updatingViewIndex && (
                        <ProgressiveControl
                            loading={deleting}
                            control={<IconButton icon={"pi-trash"} color={"text-red-500"} onClick={deleteCoursesContainer} />}
                        />
                    )}
                </HasRequiredAuthority>
                {!!updatingViewIndex && <IconButton icon={"pi-equals"} color={"text-indigo-800"} />}
            </div>

            <div className="flex justify-content-evenly">
                <Button
                    icon="pi pi-cart-plus"
                    label={`Purchase @ ${fees} ${RUPEE}`}
                    severity="success"
                    raised
                    size="small"
                    onClick={() => navigate(`/enroll/${id}`)}
                />
                <Button
                    icon="pi pi-book"
                    iconPos="right"
                    severity="warning"
                    label={`Explore Subjects`}
                    raised
                    size="small"
                    onClick={() => {
                        if (!updatingViewIndex && courses?.length === 1) navigate(`/courses/${courses[0]?.id}/subjects`);
                    }}
                />
            </div>

            {courses?.length > 1 && (
                <div>
                    <Divider className="m-0" />

                    <div className="p-2 flex flex-column gap-2 ">
                        {courses?.map((course) => (
                            <div className="text-xs font-semibold  border-1 border-orange-300 p-2 border-round bg-orange-100 text-orange-800 m-0 flex gap-2">
                                <span className="flex-1">{course?.title}</span>
                                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                                    {!updatingViewIndex && (
                                        <ProgressiveControl
                                            loading={deleting}
                                            control={<IconButton icon={"pi-trash"} color={"text-red-500"} onClick={deleteCoursesContainer} />}
                                        />
                                    )}
                                </HasRequiredAuthority>
                                <span className="pi pi-angle-right"></span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
