import { Divider } from "primereact/divider";
import TabHeader from "../../common/TabHeader";
import { Button } from "primereact/button";
import { RUPEE } from "../../../constants";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import { useOutletContext } from "react-router-dom";
import Loading from "../../common/Loading";
import NoContent from "../../common/NoContent";
import Detail from "../../common/Detail";
import { getReadableDate } from "../../../utils";
import { Tag } from "primereact/tag";

export default function Wallet() {
    const { userId } = useOutletContext();

    const { requestAPI, showToast } = useAppContext();

    const [walletTransActions, setWalletTransActions] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}/wallet-transactions`,
            requestMethod: "GET",
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (walletTransActions, responseCode) => {
                if (walletTransActions && responseCode === 200) {
                    setWalletTransActions(walletTransActions);
                } else {
                    setError("Couldn't load Wallet Transactions");
                }
            },
        });
    }, [requestAPI, userId]);

    return (
        <div className="flex flex-column h-full min-h-0">
            <TabHeader
                className={"px-3 pt-3"}
                title={`User's Wallet - ${walletTransActions?.balanace} ${RUPEE}`}
                highlights={[`Total - ${walletTransActions?.transactions?.length} Transactions`]}
                actionItems={[<Button icon="pi pi-plus" severity="warning" />]}
            />
            <Divider />
            <div className="flex-1 min-h-0 px-3 pb-2 overflow-y-auto gap-2 flex flex-column">
                {loading ? (
                    <Loading message="Loading Wallet Transactions" />
                ) : error ? (
                    <NoContent error={error} />
                ) : walletTransActions?.transactions?.length ? (
                    walletTransActions.transactions?.map(({ amount, note, created_on, created_by, created_by_full_name }) => (
                        <div className="flex align-items-center gap-2 mb-2">
                            <Detail
                                icon="pi pi-angle-right"
                                className="flex-1 mb-2"
                                title={`By ${created_by ? created_by_full_name : "System"} at ${getReadableDate({ date: created_on })}`}
                                value={note}
                            />
                            <Tag value={`  ${amount > 0 ? `+${amount}` : amount} ${RUPEE}`} severity={amount > 0 ? "success" : "danger"} />
                        </div>
                    ))
                ) : (
                    <NoContent error={"No Wallet Transactions Found"} />
                )}
            </div>
        </div>
    );
}

// ${enrollments?.length}
// onClick = { setAddingEnrollments };
