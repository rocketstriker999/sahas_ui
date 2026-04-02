import PageTitle from "../components/common/PageTitle";

import { Outlet } from "react-router-dom";

export default function StreamSelectionHelp() {
    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Psychometric Test`} />
            <Outlet />
        </div>
    );
}
