import PageTitle from "../components/common/PageTitle";
import { useState } from "react";
import Summary from "../components/revenue/Summary";
import Transactions from "../components/revenue/Transactions";

export default function Revenue() {
    const [dates, setDates] = useState();

    console.log(dates);

    return (
        <div className="flex flex-column h-full">
            <PageTitle title={"Revenue"} action={<span className="pi pi-filter-fill" />} />
            <Summary dates={dates} setDates={setDates} />
            <Transactions dates={dates} />
        </div>
    );
}
