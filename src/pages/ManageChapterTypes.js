import { Button } from "primereact/button";
import PageTitle from "../components/common/PageTitle";
import TabHeader from "../components/common/TabHeader";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "primereact/divider";
import ChapterType from "../components/manage_chapterization/ChapterType";
import OrderManager from "../components/common/OrderManager";
import { useCallback, useState } from "react";
import { useAppContext } from "../providers/ProviderAppContainer";
import { updateChapterTypes } from "../redux/sliceTemplateConfig";
import DialogAddChapterType from "../components/manage_chapterization/DialogAddChapterType";

export default function ManageChapterTypes() {
    const { chapter_types = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const [updatingViewIndex, setUpdatingViewIndex] = useState();
    const [updating, setUpdating] = useState();

    const dispatch = useDispatch();
    const { requestAPI, showToast } = useAppContext();

    const setChapterTypes = useCallback(
        (callBack) => {
            dispatch(updateChapterTypes(callBack(chapter_types)));
        },
        [chapter_types, dispatch]
    );

    const [dialogAddChapterType, setDialogAddChapterType] = useState({
        visible: false,
    });

    const closeDialogAddChapterType = useCallback(() => {
        setDialogAddChapterType((prev) => ({ ...prev, visible: false }));
    }, []);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `chapter-types/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: chapter_types.map(({ id }, view_index) => ({ id, view_index })),
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
    }, [chapter_types, requestAPI, showToast]);

    return (
        <div className="flex flex-column h-full ">
            <PageTitle title={`Chapterization`} />
            <TabHeader
                className={"px-3 pt-3"}
                title="Roles"
                highlights={[`Total - ${chapter_types?.length} Roles`]}
                actionItems={[
                    <Button
                        icon="pi pi-plus"
                        severity="warning"
                        onClick={() => setDialogAddChapterType((prev) => ({ ...prev, setChapterTypes, visible: true, closeDialog: closeDialogAddChapterType }))}
                    />,
                    <Button
                        loading={updating}
                        disabled={!chapter_types?.length}
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
                    />,
                ]}
            />
            <Divider />
            <OrderManager
                updatingViewIndex={updatingViewIndex}
                items={chapter_types}
                setItems={setChapterTypes}
                emptyItemsError="No Chapter Types Found"
                itemTemplate={(item) => <ChapterType setChapterTypes={setChapterTypes} {...item} updatingViewIndex={updatingViewIndex} />}
            />

            {dialogAddChapterType.visible && <DialogAddChapterType {...dialogAddChapterType} />}
        </div>
    );
}
