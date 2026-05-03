import PageTitle from "../components/common/PageTitle";

import { Outlet } from "react-router-dom";

export default function StreamSelectionTest() {
    return (
        <div className="flex flex-column h-full min-h-0 overflow-hidden">
            <PageTitle title={`Psychometric Test`} />
            <div className="flex-1 flex flex-column min-h-0 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}
