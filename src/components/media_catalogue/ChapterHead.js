import { useCallback, useEffect, useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useAppContext } from "../../providers/ProviderAppContainer";
import DialogAddMedia from "./DialogAddMedia";
import { getViewIndex } from "../../utils";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function ChapterHead({ setLoading, setError, mediaCatalogue, setMediaCatalogue, updatingViewIndex, setUpdatingViewIndex }) {
    const { chapterId } = useParams();
    const [updating, setUpdating] = useState();
    const [chapter, setChapter] = useState();
    const { requestAPI, showToast } = useAppContext();

    const [dialogAddMedia, setDialogAddMedia] = useState({
        chapterId,
        visible: false,
    });

    const closeDialogAddMedia = useCallback(() => {
        setDialogAddMedia((prev) => ({ ...prev, visible: false }));
    }, []);

    const navigate = useNavigate();

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
            requestPostBody: mediaCatalogue.map(({ id }, view_index) => ({ id, view_index })),
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
    }, [mediaCatalogue, requestAPI, showToast]);

    return (
        <div>
            <div className="flex align-items-center bg-gray-800 p-2 gap-2 justify-content-end">
                <BreadCrumb
                    pt={{ root: classNames("font-bold text-xs border-noround bg-transparent border-none flex-1"), label: classNames("text-white") }}
                    model={items}
                />
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                    <Button
                        onClick={() =>
                            setDialogAddMedia((prev) => ({
                                ...prev,
                                visible: true,
                                setMediaCatalogue,
                                closeDialog: closeDialogAddMedia,
                                view_index: getViewIndex(mediaCatalogue),
                            }))
                        }
                        icon="pi pi-plus"
                        severity="warning"
                    />
                </HasRequiredAuthority>

                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                    {!!mediaCatalogue?.length && (
                        <Button
                            loading={updating}
                            disabled={!mediaCatalogue?.length}
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
                    )}
                </HasRequiredAuthority>

                {dialogAddMedia?.visible && <DialogAddMedia {...dialogAddMedia} />}
            </div>
        </div>
    );
}
