import PageTitle from "../components/common/PageTitle";

import { useSelector } from "react-redux";

import StreamSelectionTestResult from "./StreamSelectionTestResult";
import StreamSelectionTest from "./StreamSelectionTest";

export default function StreamSelection() {
    const loggedInUser = useSelector((state) => state.stateUser);

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <PageTitle title={`Stream Selection Test`} />
            {loggedInUser?.stream_selection_test_taken ? <StreamSelectionTestResult /> : <StreamSelectionTest />}
        </div>
    );
}
