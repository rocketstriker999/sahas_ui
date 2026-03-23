import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { RUPEE } from "../../constants";
import Detail from "../common/Detail";
import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";

export default function Summary({ dates, setDates }) {
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();
    const [summary, setSummary] = useState();

    useEffect(() => {
        if (dates)
            requestAPI({
                requestMethod: "GET",
                requestPath: `enrollment-transactions/summary`,
                requestGetQuery: {
                    start_date: dates[0],
                    end_date: dates[1],
                },
                setLoading: setLoading,
                onResponseReceieved: ({ error, ...summary }, responseCode) => {
                    if (summary && responseCode === 200) setSummary(summary);
                    else showToast({ severity: "error", summary: "Failed", detail: "Failed To Load Summary !", life: 2000 });
                },
            });
    }, [dates, requestAPI, showToast]);

    if (loading) {
        return <Loading message={"Preparing Summary"} />;
    }

    return (
        <div>
            <div className="p-2 flex align-items-center jsutify-content-between">
                <span className="font-semibold flex-1">Revenue Summary</span>
                <Calendar
                    pt={{
                        input: {
                            root: {
                                className: classNames("bg-orange-500 text-xs text-white font-semibold border-1 border-orange-600 p-2 text-center"),
                            },
                        },
                    }}
                    value={dates}
                    onChange={(e) => setDates(e.value)}
                    selectionMode="range"
                    readOnlyInput
                    hideOnRangeSelection
                    dateFormat="dd/mm/yy"
                />
            </div>

            <div className="p-2 flex justify-content-around  ">
                <Detail className={"border-1 border-gray-300 border-round p-3 "} icon={"pi pi-calculator"} title="Transactions" value={summary?.transactions} />
                <Detail className={"border-1 border-gray-300 border-round p-3 "} icon={"pi pi-users"} title="Enrollments" value={summary?.enrollments} />
            </div>
            <div className="px-2 mt-1 flex justify-content-around  ">
                <Detail
                    className={"border-1 border-blue-300 border-round p-2 bg-blue-100"}
                    icon={"pi pi-money-bill"}
                    title="Total"
                    value={`${summary?.total}${RUPEE}`}
                />
                <Detail
                    className={"border-1 border-green-300 border-round p-2 bg-green-100"}
                    icon={"pi pi-box"}
                    title="Collection"
                    value={`${summary?.collection}${RUPEE}`}
                />
                <Detail
                    className={"border-1 border-red-300 border-round p-2 bg-red-100 "}
                    icon={"pi pi-exclamation-circle"}
                    title="Dues"
                    value={`${summary?.due}${RUPEE}`}
                />
            </div>
            <Divider />
        </div>
    );
}
