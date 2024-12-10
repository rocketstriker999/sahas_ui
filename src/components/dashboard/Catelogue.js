import { Fragment, useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import CatelogueCourses from "./CatelogueCourses";
import MyCourses from "./MyCourses";

export default function Catelogue() {
    const options = ["All Courses", "My Courses"];
    const [catelogue, setCatelogue] = useState(options[0]);

    return (
        <Fragment>
            <div className="card flex justify-content-center mt-3">
                <SelectButton value={catelogue} onChange={(e) => setCatelogue(e.value)} options={options} />
            </div>
            <div className="p-3">
                {catelogue === "All Courses" && <CatelogueCourses />}
                {catelogue === "My Courses" && <MyCourses />}
            </div>
        </Fragment>
    );
}
