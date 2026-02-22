import { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";
import NoContent from "../common/NoContent";
import PoliciesHeader from "./PoliciesHeader";
import PolicyHead from "./PolicyHead";
import PolicyBody from "./PolicyBody";

// TODO: Replace with API when backend is ready - dummy data for accordion testing
const DUMMY_POLICIES = [
    { id: 1, title: "Refund Policy", content: "Students can request a full refund within 7 days of enrollment if the course does not meet their expectations.", created_at: "2024-01-15T10:00:00", updated_at: "2024-01-20T14:30:00" },
    { id: 2, title: "Attendance Policy", content: "Minimum 75% attendance is required to be eligible for certificates and examinations.", created_at: "2024-01-10T09:00:00", updated_at: "2024-01-18T11:00:00" },
    { id: 3, title: "Code of Conduct", content: "All students must maintain respect and integrity. Any form of misconduct may result in termination of enrollment.", created_at: "2024-01-05T08:00:00", updated_at: "2024-01-15T16:45:00" },
    { id: 4, title: "Privacy Policy", content: "All students must maintain respect and integrity. Any form of misconduct may result in termination of enrollment.", created_at: "2024-01-05T08:00:00", updated_at: "2024-01-15T16:45:00" },
    { id: 5, title: "Terms of Service", content: "All students must maintain respect and integrity. Any form of misconduct may result in termination of enrollment.", created_at: "2024-01-05T08:00:00", updated_at: "2024-01-15T16:45:00" },
];

export default function Policies() {
    const [policies, setPolicies] = useState(DUMMY_POLICIES);
    const useDummyData = true;

    return (
        <div className="flex flex-column h-full min-h-0">
            <PoliciesHeader policies={policies} setPolicies={setPolicies} useDummyData={useDummyData} />

            <Divider />

            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-scroll gap-2 flex flex-column">
                {policies?.length ? (
                    <Accordion activeIndex={0}>
                        {policies.map((policy, index) => (
                            <AccordionTab
                                key={policy?.id}
                                header={() => <PolicyHead {...policy} index={policies.length - index} />}
                            >
                                <PolicyBody setPolicies={setPolicies} useDummyData={useDummyData} {...policy} />
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
