import { useCallback, useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";
import { useAppContext } from "../providers/ProviderAppContainer";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import PolicyHead from "../components/policies/PolicyHead";
import PageTitle from "../components/common/PageTitle";
import DialogAddPolicy from "../components/policies/DialogAddPolicy";
import DialogEditPolicy from "../components/policies/DialogEditPolicy";

import TabHeader from "../components/common/TabHeader";
import { Button } from "primereact/button";
import OrderManager from "../components/common/OrderManager";
import { Fieldset } from "primereact/fieldset";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../constants";

export default function Policies() {
    const [policies, setPolicies] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { requestAPI } = useAppContext();

    const [dialogEditPolicy, setDialogEditPolicy] = useState({ visible: false });

    const closeDialogEditPolicy = useCallback(() => {
        setDialogEditPolicy((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        requestAPI({
            requestPath: "policies",
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: ({ error, ...policies }, responseCode) => {
                if (policies && responseCode === 200) {
                    setPolicies(policies);
                } else {
                    setError("Couldn't load Policies");
                }
            },
        });
    }, [requestAPI]);

    const [dialogAddPolicy, setDialogAddPolicy] = useState({
        visible: false,
    });

    const closeDialogAddPolicy = useCallback(() => {
        setDialogAddPolicy((prev) => ({ ...prev, visible: false }));
    }, []);
    const [updatingViewIndex, setUpdatingViewIndex] = useState();

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Policies`} />

            <TabHeader
                className={"mx-3 mt-2"}
                title="Policies Sahas Follow"
                highlights={[`Following Policies get applied`]}
                actionItems={[
                    <HasRequiredAuthority requiredAuthority={AUTHORITIES.CREATE_POLICY}>
                        <Button
                            icon="pi pi-plus"
                            severity="warning"
                            onClick={() =>
                                setDialogAddPolicy((prev) => ({
                                    ...prev,
                                    setPolicies,
                                    visible: true,
                                    closeDialog: closeDialogAddPolicy,
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
                    <Loading message="Loading Policies" />
                ) : error ? (
                    <NoContent error={error} />
                ) : policies?.length ? (
                    <OrderManager
                        updatingViewIndex={updatingViewIndex}
                        items={policies}
                        setItems={setPolicies}
                        entity={"Categories"}
                        itemTemplate={(item) => (
                            <Fieldset
                                collapsed={true}
                                toggleable
                                legend={<PolicyHead {...item} setPolicies={setPolicies} setDialogEditPolicy={setDialogEditPolicy} />}
                            >
                                <span>{item?.description}</span>
                            </Fieldset>
                        )}
                    />
                ) : (
                    <NoContent error={"No Policies Found"} />
                )}
            </div>
            {dialogAddPolicy?.visible && <DialogAddPolicy {...dialogAddPolicy} />}
            {dialogEditPolicy?.visible && <DialogEditPolicy {...dialogEditPolicy} closeDialog={closeDialogEditPolicy} />}
        </div>
    );
}
