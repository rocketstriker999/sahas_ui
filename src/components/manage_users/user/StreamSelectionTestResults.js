import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import Loading from "../../common/Loading";
import { Accordion, AccordionTab } from "primereact/accordion";
import { getReadableDate } from "../../../utils";
import Summary from "../../common/Summary";
import { useOutletContext } from "react-router-dom";
import NoContent from "../../common/NoContent";

export default function StreamSelectionTestResults() {
    const { requestAPI, showToast } = useAppContext();
    const [loading, setLoading] = useState();

    const [streamSelectionTestResults, setStreamSelectionTestResults] = useState();

    const { userId } = useOutletContext();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}/stream-selection-test-results`,
            requestMethod: "GET",
            setLoading: setLoading,
            onResponseReceieved: (streamSelectionTestResults, responseCode) => {
                if (streamSelectionTestResults && responseCode === 200) {
                    setStreamSelectionTestResults(streamSelectionTestResults);
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Psychometric Test Result !", life: 2000 });
                }
            },
        });
    }, [requestAPI, showToast, userId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-2 flex flex-column h-full min-h-0">
            {streamSelectionTestResults?.length ? (
                <Accordion className="mt-2 flex-1 overflow-y-scroll" activeIndex={0}>
                    {streamSelectionTestResults?.map(({ id, created_at, result, answers }, index) => (
                        <AccordionTab key={id} header={`${streamSelectionTestResults.length - index}. Conducted At - ${getReadableDate({ date: created_at })}`}>
                            <Summary icon={"pi pi-search"} title={"Result"} values={[result]} />
                            <Summary icon={"pi pi-pen-to-square"} title={"Q&A"} values={answers?.map(({ question, answer }) => `${question} -> ${answer}`)} />
                        </AccordionTab>
                    ))}
                </Accordion>
            ) : (
                <NoContent error={"No P.C.A.T. Test results availbale"} />
            )}
        </div>
    );
}
