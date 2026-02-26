import { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import PoliciesHeader from "./PoliciesHeader";
import PolicyHead from "./PolicyHead";
import PolicyBody from "./PolicyBody";

export default function Policies() {
    const [policies, setPolicies] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    useEffect(() => {
        requestAPI({
            requestPath: "policies",
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (policies, responseCode) => {
                if (policies && responseCode === 200) {
                    setPolicies(policies);
                } else {
                    setError("Couldn't load Policies");
                }
            },
        });
    }, [requestAPI]);

    return (
        <div className="flex flex-column h-full min-h-0">
            <PoliciesHeader policies={policies} setPolicies={setPolicies} />

            <Divider />

            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Policies" />
                ) : error ? (
                    <NoContent error={error} />
                ) : policies?.length ? (
                    <Accordion activeIndex={0}>
                        {policies.map((policy, index) => (
                            <AccordionTab
                                key={policy?.id}
                                header={() => <PolicyHead {...policy} index={policies.length - index} />}
                            >
                                <PolicyBody setPolicies={setPolicies} {...policy} />
                            </AccordionTab>
                        ))}
                    </Accordion>
                ) : (
                    <NoContent error={"No Policies Found"} />
                )}
            </div>
        </div>
    );
}
