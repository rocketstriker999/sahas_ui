import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import { Accordion, AccordionTab } from "primereact/accordion";
import CheckboxInput from "../../common/CheckBoxInput";
import { getReadableDate } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import Summary from "../../common/Summary";
import { updateCurrentUser } from "../../../redux/sliceUser";

export default function StreamSelectionTestResults() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const [streamSelectionTestResults, setStreamSelectionTestResults] = useState();

    const loggedInUser = useSelector((state) => state.stateUser);
    const dispatch = useDispatch();

    useEffect(() => {
        requestAPI({
            requestPath: `users/stream-selection-test-results`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (streamSelectionTestResults, responseCode) => {
                if (streamSelectionTestResults && responseCode === 200) {
                    setStreamSelectionTestResults(streamSelectionTestResults);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Psychometric Test Questions !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

    const updateStreamSelectionTestAccess = useCallback(
        (allowStreamSelectionTest) => {
            requestAPI({
                requestPath: `users/stream-selection-test-taken`,
                requestMethod: "PATCH",
                requestPostBody: { id: loggedInUser?.id, stream_selection_test_taken: !allowStreamSelectionTest },
                setLoading: setLoading,
                onRequestFailure: () => showToast({ severity: "error", summary: "Failed", detail: "Failed To Update Psychometric Test Access !", life: 2000 }),
                onResponseReceieved: ({ error, ...updatedUser }, responseCode) => {
                    if (updatedUser && responseCode === 200) {
                        showToast({ severity: "success", summary: "Updated", detail: "Psychometric Test Access Updated", life: 1000 });
                        dispatch(updateCurrentUser(updatedUser));
                    } else showToast({ severity: "error", summary: "Failed", detail: error || "Failed To Update Psychometric Test Access !", life: 2000 });
                },
            });
        },
        [dispatch, loggedInUser?.id, requestAPI, showToast],
    );

    if (loading) {
        return <Loading />;
    }

    return streamSelectionTestResults?.length ? (
        <div className="p-2 flex flex-column h-full min-h-0">
            <CheckboxInput
                label={"Psychometric Test Allowed"}
                checked={!loggedInUser?.stream_selection_test_taken}
                onChange={updateStreamSelectionTestAccess}
            />
            <Accordion className="mt-2 flex-1 overflow-y-scroll" activeIndex={0}>
                {streamSelectionTestResults?.map(({ id, created_at, result, answers }, index) => (
                    <AccordionTab key={id} header={`${streamSelectionTestResults.length - index}. Conducted At - ${getReadableDate({ date: created_at })}`}>
                        <Summary icon={"pi pi-search"} title={"Result"} values={[result]} />
                        <Summary icon={"pi pi-pen-to-square"} title={"Q&A"} values={answers?.map(({ question, answer }) => `${question} -> ${answer}`)} />
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    ) : (
        <NoContent error={"No Psychometric Tests Found"} />
    );
}
