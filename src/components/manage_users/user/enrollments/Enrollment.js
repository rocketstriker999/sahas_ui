import { useState } from "react";
import Detail from "../../../common/Detail";
import { getReadableDate } from "../../../../utils";
import { TabView, TabPanel } from "primereact/tabview";
import TransactionsHead from "./TransactionsHead";
import TransactionsTabBody from "./TransactionsTabBody";
import CoursesHead from "./CoursesHead";
import CoursesTabBody from "./CoursesTabBody";

export default function Enrollment({ index, setEnrollments, ...props }) {
    const [totalTransactions, setTotalTransactions] = useState();
    const [totalCourses, setTotalCourses] = useState();

    return (
        <div className="flex flex-column ">
            <div className="flex align-items-center justify-content-around p-3 border-bottom-1 border-300">
                <Detail icon="pi pi-calendar" title="Start Date" value={getReadableDate({ date: props?.start_date, removeTime: true })} />
                <Detail icon="pi pi-calendar" title="End Date" value={getReadableDate({ date: props?.end_date, removeTime: true })} />
            </div>

            <TabView>
                <TabPanel
                    headerTemplate={(option) => <TransactionsHead {...option} totalTransactions={totalTransactions} />}
                    pt={{
                        header: { className: "flex-1" },
                    }}
                >
                    <TransactionsTabBody {...props} setTotalTransactions={setTotalTransactions} />
                </TabPanel>

                <TabPanel
                    headerTemplate={(option) => <CoursesHead {...option} totalCourses={totalCourses} />}
                    pt={{
                        header: { className: "flex-1 " },
                    }}
                >
                    <CoursesTabBody {...props} setTotalCourses={setTotalCourses} />
                </TabPanel>
            </TabView>
        </div>
    );
}
