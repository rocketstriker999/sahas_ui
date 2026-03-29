import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import { Accordion, AccordionTab } from "primereact/accordion";
import CheckboxInput from "../../common/CheckBoxInput";
import { getReadableDate } from "../../../utils";
import { useSelector } from "react-redux";
import Summary from "../../common/Summary";
import { Divider } from "primereact/divider";

export default function StreamSelectionTestResults() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const [streamSelectionTestResults, setStreamSelectionTestResults] = useState();

    const loggedInUser = useSelector((state) => state.stateUser);

    useEffect(() => {
        requestAPI({
            requestPath: `users/stream-selection-test-results`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (streamSelectionTestResults, responseCode) => {
                if (streamSelectionTestResults && responseCode === 200) {
                    setStreamSelectionTestResults(streamSelectionTestResults);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Stream Selection Questions !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast]);

    if (loading) {
        return <Loading />;
    }

    return streamSelectionTestResults?.length ? (
        <div className="p-2 flex flex-column h-full min-h-0">
            <CheckboxInput
                label={"Stream Selection Test Allowed"}
                checked={!loggedInUser?.stream_selection_test_taken}
                onChange={(checked) => console.log("")}
            />
            <Accordion className="mt-2 flex-1 overflow-y-scroll" activeIndex={0}>
                {streamSelectionTestResults?.map(({ id, created_at, result, answers }, index) => (
                    <AccordionTab header={`${streamSelectionTestResults.length - index}. Conducted At - ${getReadableDate({ date: created_at })}`}>
                        <Summary icon={"pi pi-search"} title={"Result"} values={[result]} />
                        <Summary icon={"pi pi-pen-to-square"} title={"Q&A"} values={answers?.map(({ question, answer }) => `${question} -> ${answer}`)} />
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    ) : (
        <NoContent error={"No Stream Selection Tests Found"} />
    );
}
