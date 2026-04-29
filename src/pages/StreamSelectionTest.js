import { useState } from "react";
import PageTitle from "../components/common/PageTitle";

import { Outlet } from "react-router-dom";

export default function StreamSelectionTest() {


    const [streamSelectionTestResult, setStreamSelectionTestResult] = useState();


    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Psychometric Test`} />
            <Outlet context={{ streamSelectionTestResult, setStreamSelectionTestResult }} />
        </div>
    );
}
