import { Divider } from "primereact/divider";
import Detail from "../components/common/Detail";
import PageTitle from "../components/common/PageTitle";
import { RUPEE } from "../constants";
import Transaction from "../components/revenue/Transaction";
import { getReadableDate } from "../utils";
import { Tag } from "primereact/tag";

export default function Revenue() {
    return (
        <div className="flex flex-column h-full">
            <PageTitle title={"Revenue"} action={<span className="pi pi-filter-fill" />} />

            <div>
                <div className="p-2 flex align-items-center jsutify-content-between">
                    <span className="font-semibold flex-1">Revenue Summary</span>
                    <Tag
                        className="mr-2"
                        icon="pi pi-calendar"
                        severity="warning"
                        value={`${getReadableDate({ date: "2025-12-13 09:46:23", removeTime: true })} -
                            ${getReadableDate({ date: "2025-12-13 09:46:23", removeTime: true })}`}
                    ></Tag>
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

            <div className="flex-1 p-2">
                <Transaction id={1} user_id={22} full_name={"Nisarg Jani"} amount={2000} product={"Product 1"} created_on="2025-12-13 09:46:23" />
            </div>
        </div>
    );
}
