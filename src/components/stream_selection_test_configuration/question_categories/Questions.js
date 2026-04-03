import { useCallback, useState } from "react";
import TabHeader from "../../common/TabHeader";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";

import DialogAddQuestion from "./DialogAddQuestion";
import DialogEditQuestion from "./DialogEditQuestion";
import IconButton from "../../common/IconButton";
import { ICON_SIZE } from "../../../style";
import OrderManager from "../../common/OrderManager";
import Question from "./Question";

export default function Questions(props) {
    const [questions, setQuestions] = useState([...props?.questions]);

    const [dialogEditQuestion, setDialogEditQuestion] = useState({ visible: false });

    const closeDialogEditQuestion = useCallback(() => {
        setDialogEditQuestion((prev) => ({ ...prev, visible: false }));
    }, []);

    const [dialogAddQuestion, setDialogAddQuestion] = useState({
        category_id: props?.id,
        visible: false,
    });

    const closeDialogAddQuestion = useCallback(() => {
        setDialogAddQuestion((prev) => ({ ...prev, visible: false }));
    }, []);

    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    return (
        <div>
            <TabHeader
                className={"border-1 border-gray-300 border-round p-2"}
                title="P.C.A.T. Questions"
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
                            onClick={() =>
                                setDialogAddQuestion((prev) => ({
                                    ...prev,
                                    setQuestions,
                                    visible: true,
                                    closeDialog: closeDialogEditQuestion,
                                }))
                            }
                            className={ICON_SIZE}
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
                    itemTemplate={(item) => <Question key={item?.id} {...item} setQuestions={setQuestions} setDialogEditQuestion={setDialogEditQuestion} />}
                />
            </div>

            {dialogAddQuestion?.visible && <DialogAddQuestion {...dialogAddQuestion} />}
            {dialogEditQuestion?.visible && <DialogEditQuestion {...dialogEditQuestion} closeDialog={closeDialogEditQuestion} />}
        </div>
    );
}
