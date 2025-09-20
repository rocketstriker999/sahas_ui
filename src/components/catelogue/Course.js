import { Tag } from "primereact/tag";
import { RUPEE } from "../../constants";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useState } from "react";
import ProgressiveControl from "../common/ProgressiveControl";

export default function Course({ id, title, description, price, image, setCourses }) {
    //check if course is already subscribed

    const { requestAPI, showToast } = useAppContext();

    const [deleting, setDeleting] = useState();

    const deleteCourse = useCallback(() => {
        requestAPI({
            requestPath: `courses/${id}`,
            requestMethod: "DELETE",
            setUpdating: setDeleting,
            parseResponseBody: false,
            onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Course !", life: 2000 }),
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({
                        severity: "success",
                        summary: "Deleted",
                        detail: `Course Deleted`,
                        life: 1000,
                    });
                    setCourses((prev) => prev?.filter((course) => course?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Course !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setCourses, showToast]);

    return (
        <div className="border-1 border-gray-300 border-round  flex flex-column gap-2 overflow-hidden pb-2">
            <div className="relative">
                <img className=" w-full" src={image} alt={title} />
                <div className="absolute top-0 right-0 m-3 flex gap-2">
                    <ProgressiveControl loading={deleting} control={<Button onClick={deleteCourse} icon="pi pi-trash" rounded outlined severity="danger" />} />
                    <Button icon="pi pi-pencil" rounded outlined severity="warning" />
                </div>
            </div>

            <div className="flex align-items-center justify-content-between px-2">
                <span className="text-sm font-semibold text-indigo-800">
                    <i className="pi text-xs pi-info-circle"></i> {title}
                </span>

                <Tag icon="pi pi-arrow-circle-right" className="text-sm" severity="info" value={`Enroll Atttt ${price} ${RUPEE}`}></Tag>
            </div>
            <span className="text-xs px-2">{description}</span>
        </div>
    );
}
