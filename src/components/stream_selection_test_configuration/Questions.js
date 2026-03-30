import { useCallback, useEffect, useState } from "react";
import PageTitle from "../common/PageTitle";
import { useAppContext } from "../../providers/ProviderAppContainer";
import TabHeader from "../common/TabHeader";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Loading from "../common/Loading";
import OrderManager from "../common/OrderManager";
import Question from "./questions/Question";
import DialogAddQuestion from "./questions/DialogAddQuestion";
import DialogEditQuestion from "./questions/DialogEditQuestion";

export default function Questions() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();
    const [questions, setQuestions] = useState([]);

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
                    console.log(questions);
                    setQuestions([...questions]);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Stream Selection Questions !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

    console.log(questions);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Stream Selection Questions`} />
            <TabHeader
                className={"mx-3 mt-2"}
                title="Policies Sahas Follow"
                highlights={[`Following Policies get applied`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_STREAM_SELECTION_TEST}>
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
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_POLICY_VIEW_INDEX}>
                        <Button loading={loading} onClick={() => {}} icon="pi pi-arrows-v" />
                    </HasRequiredAuthority>,
                ]}
            />
            <Divider />

            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Questions" />
                ) : (
                    <OrderManager
                        updatingViewIndex={updatingViewIndex}
                        items={questions}
                        setItems={setQuestions}
                        entity={"Questions"}
                        itemTemplate={(item) => <Question key={item?.id} {...item} setQuestions={setQuestions} setDialogEditQuestion={setDialogEditQuestion} />}
                    />
                )}
            </div>

            {dialogAddQuestion?.visible && <DialogAddQuestion {...dialogAddQuestion} />}
            {dialogEditQuestion?.visible && <DialogEditQuestion {...dialogEditQuestion} closeDialog={closeDialogEditQuestion} />}
        </div>
    );
}
