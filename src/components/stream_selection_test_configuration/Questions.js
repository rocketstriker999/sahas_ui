import { useCallback, useEffect, useState } from "react";
import PageTitle from "../common/PageTitle";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import OrderManager from "../common/OrderManager";
import Question from "./questions/Question";
import DialogAddQuestion from "./questions/DialogAddQuestion";
import DialogEditQuestion from "./questions/DialogEditQuestion";

export default function Questions() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [questions, setQuestions] = useState();

    const [dialogEditQuestion, setDialogEditQuestion] = useState({ visible: false });

    const closeDialogEditQuestion = useCallback(() => {
        setDialogEditQuestion((prev) => ({ ...prev, visible: false }));
    }, []);

    const [dialogAddQuestion, setDialogAddQuestion] = useState({
        visible: false,
    });

    const closeDialogAddQuestion = useCallback(() => {
        setDialogAddQuestion((prev) => ({ ...prev, visible: false }));
    }, []);
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `stream-selection-questions`,
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
    }, [requestAPI, showToast]);

    return (
        <div className="flex-1 flex flex-column min-h-0 h-full">
            <TabHeader
                className={"mx-3 mt-2"}
                title="P.C.A.T. Questions"
                highlights={[`Following Questions Will Be Asked For P.C.A.T.`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_STREAM_SELECTION_TEST_QUESTION}>
                        <Button
                            icon="pi pi-plus"
                            severity="warning"
                            onClick={() =>
                                setDialogAddQuestion((prev) => ({
                                    ...prev,
                                    setQuestions,
                                    visible: true,
                                    closeDialog: closeDialogAddQuestion,
                                }))
                            }
                        />
                    </HasRequiredAuthority>,
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_STREAM_SELECTION_TEST_QUESTION}>
                        <Button loading={loading} icon="pi pi-arrows-v" />
                    </HasRequiredAuthority>,
                ]}
            />
            <Divider />

            <div className="flex-1 overflow-y-scroll ">
                <OrderManager
                    loading={loading}
                    updatingViewIndex={updatingViewIndex}
                    items={questions}
                    setItems={setQuestions}
                    entity={"Questions"}
                    itemTemplate={(item) => <Question key={item?.id} {...item} setQuestions={setQuestions} setDialogEditQuestion={setDialogEditQuestion} />}
                />
            </div>

            {dialogAddQuestion?.visible && <DialogAddQuestion {...dialogAddQuestion} />}
            {dialogEditQuestion?.visible && <DialogEditQuestion {...dialogEditQuestion} closeDialog={closeDialogEditQuestion} />}
        </div>
    );
}
