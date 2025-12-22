import PageTitle from "../components/common/PageTitle";
import { useState } from "react";
import Summary from "../components/revenue/Summary";
import Transactions from "../components/revenue/Transactions";
import moment from "moment";

export default function Revenue() {
    const [dates, setDates] = useState([
        moment().subtract(7, "days").toDate(), // Start date (7 days ago)
        moment().endOf("day").toDate(), // End date (Today)
    ]);

    console.log(dates);

    return (
        <div className="flex flex-column h-full">
            <PageTitle title={"Revenue"} action={<span className="pi pi-filter-fill" />} />
            <Summary dates={dates} setDates={setDates} />
            <Transactions dates={dates} />
        </div>
    );
}
