import { useCallback, useEffect, useState } from "react";
import TabHeader from "../../common/TabHeader";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";

import DialogAddQuestion from "./DialogAddQuestion";
import DialogEditQuestion from "./DialogEditQuestion";
import IconButton from "../../common/IconButton";
import { ICON_SIZE } from "../../../style";
import OrderManager from "../../common/OrderManager";
import Question from "./Question";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../providers/ProviderAppContainer";

export default function Questions() {
    const { id } = useParams();

    const [loading, setLoading] = useState();

    const [questions, setQuestions] = useState();

    const { requestAPI, showToast } = useAppContext();

    const [dialogEditQuestion, setDialogEditQuestion] = useState({ visible: false });

    const closeDialogEditQuestion = useCallback(() => {
        setDialogEditQuestion((prev) => ({ ...prev, visible: false }));
    }, []);

    const [dialogAddQuestion, setDialogAddQuestion] = useState({
        category_id: id,
        visible: false,
    });

    const closeDialogAddQuestion = useCallback(() => {
        setDialogAddQuestion((prev) => ({ ...prev, visible: false }));
    }, []);

    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `stream-selection-question-categories/${id}/questions`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (questions, responseCode) => {
                if (questions && responseCode === 200) {
                    setQuestions(questions);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Psychometric Test Questions !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, showToast]);

    const updateViewIndexs = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-questions/view_indexes`,
            requestMethod: "PATCH",
            requestPostBody: questions.map(({ id }, view_index) => ({ id, view_index })),
            setLoading: setLoading,
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
    }, [questions, requestAPI, showToast]);

    return (
        <div className="flex-1 flex flex-column min-h-0 h-full p-2">
            <TabHeader
                className={"border-1 border-gray-300 border-round p-3"}
                title={`P.C.A.T. Questions For Category : ${id}`}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_STREAM_SELECTION_TEST_QUESTION}>
                        <IconButton
                            icon={"pi-plus"}
                            color={"text-red-500"}
                            onClick={() =>
                                setDialogAddQuestion((prev) => ({
                                    ...prev,
                                    setQuestions,
                                    visible: true,
                                    closeDialog: closeDialogAddQuestion,
                                }))
                            }
                            className={ICON_SIZE}
                        />
                    </HasRequiredAuthority>,
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_STREAM_SELECTION_TEST_QUESTION}>
                        <IconButton
                            icon={"pi-arrows-v"}
                            color={"text-blue-500"}
                            className={ICON_SIZE}
                            loading={loading}
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
                        />
                    </HasRequiredAuthority>,
                ]}
            />

            <div className="flex-1 overflow-y-scroll ">
                <OrderManager
                    updatingViewIndex={updatingViewIndex}
                    items={questions}
                    setItems={setQuestions}
                    entity={"Questions"}
                    itemTemplate={(item) => (
                        <Question
                            updatingViewIndex={updatingViewIndex}
                            setUpdatingViewIndex={setUpdatingViewIndex}
                            key={item?.id}
                            {...item}
                            setQuestions={setQuestions}
                            setDialogEditQuestion={setDialogEditQuestion}
                        />
                    )}
                />
            </div>

            {dialogAddQuestion?.visible && <DialogAddQuestion {...dialogAddQuestion} />}
            {dialogEditQuestion?.visible && <DialogEditQuestion {...dialogEditQuestion} closeDialog={closeDialogEditQuestion} />}
        </div>
    );
}
