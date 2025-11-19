import { useCallback, useEffect, useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";

export default function ChapterHead({ updatingViewIndex, setUpdatingViewIndex, setLoading, setError, media, setMedia }) {
    const { chapterId } = useParams();
    const [updating, setUpdating] = useState();
    const [chapter, setChapter] = useState();
    const { requestAPI, showToast } = useAppContext();

    const navigate = useNavigate();

    const [dialogAddMedia, setDialogAddMedia] = useState({
        chapterId,
        visible: false,
    });

    const closeDialogAddMedia = useCallback(() => {
        setDialogAddMedia((prev) => ({ ...prev, visible: false }));
    }, []);

    const items = [
        {
            label: chapter?.subject?.title,
            command: () => navigate(-2),
        },
        { label: chapter?.title, command: () => navigate(-1) },
    ];

    useEffect(() => {
        requestAPI({
            requestPath: `chapters/${chapterId}`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (chapter, responseCode) => {
                if (chapter && responseCode === 200) setChapter(chapter);
                else setError("Couldn't load Subject & Chapter");
            },
        });
    }, [chapterId, requestAPI, setError, setLoading]);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `media/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: media.map(({ id }, view_index) => ({ id, view_index })),
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
    }, [media, requestAPI, showToast]);

    return (
        <div className="flex align-items-center bg-gray-800 p-2 gap-1 justify-content-end">
            <BreadCrumb
                pt={{ root: classNames("font-bold text-sm border-noround bg-transparent border-none flex-1"), label: classNames("text-white") }}
                model={items}
            />
            <Button
                onClick={() => setDialogAddMedia((prev) => ({ ...prev, visible: true, setMedia, closeDialog: closeDialogAddMedia }))}
                icon="pi pi-plus"
                severity="warning"
            />
            ,
            <Button
                loading={updating}
                disabled={!media?.length}
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
                icon="pi pi-arrows-v"
            />
        </div>
    );
}
