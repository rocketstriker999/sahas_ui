import { TabView, TabPanel } from "primereact/tabview";
import { ChaptersTypeHead } from "./ChaptersTypeHead";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import NoContent from "../common/NoContent";
import { BlockUI } from "primereact/blockui";
import Chapter from "./Chapter";
import Loading from "../common/Loading";
import DialogAddChapter from "./DialogAddChapter";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import OrderManager from "../common/OrderManager";
import ChaptersHead from "./ChaptersHead";

export function Chapters() {
    const { subjectId } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [dialogAddChapter, setDialogAddChapter] = useState({
        subjectId,
        visible: false,
    });

    const [updatingViewIndex, setUpdatingViewIndex] = useState();
    const { requestAPI } = useAppContext();
    const { chapter_types = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const [chapters, setChapters] = useState();

    const { enrollment } = useOutletContext();

    const chapterTabs = useMemo(
        () => chapter_types.map((chapterType) => ({ ...chapterType, chapters: chapters?.filter(({ type }) => type === chapterType.id) })),
        [chapter_types, chapters]
    );

    const closeDialogAddChapter = useCallback(() => {
        setDialogAddChapter((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: `subjects/${subjectId}/chapters`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestStart: setError,
            onRequestFailure: setError,
            onResponseReceieved: (chapters, responseCode) => {
                if (chapters && responseCode === 200) {
                    setChapters(chapters);
                } else {
                    setError("Couldn't load Chapter Tabs");
                }
            },
        });
    }, [chapter_types, requestAPI, subjectId]);

    return (
        <div className="flex-1 overflow-hidden flex flex-column gap-2">
            <ChaptersHead
                {...{ setLoading, setError, chapters, setChapters, setDialogAddChapter, updatingViewIndex, setUpdatingViewIndex, closeDialogAddChapter }}
            />
            {!!enrollment?.digital_access && (
                <div className="flex align-items-center gap-2 px-2">
                    <Button severity="warning" onClick={() => {}} icon="pi pi-pencil" />
                    <Button className="flex-1" label="Launch Quick " iconPos="right" icon="pi pi-question-circle" />
                    <Button severity="warning" disabled={!chapters?.length} onClick={() => {}} icon="pi pi-history" />
                </div>
            )}
            {loading ? (
                <Loading />
            ) : error ? (
                <NoContent error={error} />
            ) : chapterTabs?.length ? (
                <TabView
                    pt={{
                        panelcontainer: classNames("p-0"),
                    }}
                >
                    {chapterTabs.map((chaptersTab) => (
                        <TabPanel key={chaptersTab?.id} headerTemplate={(option) => <ChaptersTypeHead {...option} {...chaptersTab} />}>
                            <BlockUI
                                pt={{
                                    root: classNames("mx-2"),
                                    mask: "bg-black-alpha-80 align-items-start p-4",
                                }}
                                blocked={!!chaptersTab?.requires_enrollment_digital_access ? !enrollment?.digital_access : false}
                                template={
                                    <div className="text-white flex flex-column align-items-center">
                                        <i className="pi pi-lock" style={{ fontSize: "3rem" }}></i>
                                        <p>You Don't Have Access To This Content</p>
                                    </div>
                                }
                            >
                                <OrderManager
                                    updatingViewIndex={updatingViewIndex}
                                    items={chaptersTab?.chapters}
                                    setItems={setChapters}
                                    emptyItemsError="No Chapters Found"
                                    itemTemplate={(item) => <Chapter setChapters={setChapters} {...item} updatingViewIndex={updatingViewIndex} />}
                                />
                            </BlockUI>
                        </TabPanel>
                    ))}
                </TabView>
            ) : (
                <NoContent />
            )}
            {dialogAddChapter?.visible && <DialogAddChapter {...dialogAddChapter} />}
        </div>
    );
}
