import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { RUPEE } from "../../constants";
import Detail from "../common/Detail";

export default function Summary({ dates, setDates }) {
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
                />
            </div>

            <div className="p-2 flex justify-content-around  ">
                <Detail className={"border-1 border-gray-300 border-round p-3 "} icon={"pi pi-calculator"} title="Transactions" value="1200" />
                <Detail className={"border-1 border-gray-300 border-round p-3 "} icon={"pi pi-users"} title="Enrollments" value="20" />
            </div>
            <div className="px-2 mt-1 flex justify-content-around  ">
                <Detail
                    className={"border-1 border-blue-300 border-round p-2 bg-blue-100"}
                    icon={"pi pi-money-bill"}
                    title="Total"
                    value={`${2358000}${RUPEE}`}
                />
                <Detail
                    className={"border-1 border-green-300 border-round p-2 bg-green-100"}
                    icon={"pi pi-box"}
                    title="Collection"
                    value={`${2159000}${RUPEE}`}
                />
                <Detail
                    className={"border-1 border-red-300 border-round p-2 bg-red-100 "}
                    icon={"pi pi-exclamation-circle"}
                    title="Dues"
                    value={`${200000}${RUPEE}`}
                />
            </div>
            <Divider />
        </div>
    );
}
