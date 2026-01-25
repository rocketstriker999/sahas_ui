import { Divider } from "primereact/divider";
import Timer from "../common/Timer";

export default function Summary({ test, showResult }) {
    return (
        <div className="flex align-items-center justify-content-center">
            <Timer minutes={test.timerMinute} onTimeUp={showResult} />
            <Divider layout="vertical" />
            <div className="flex flex-column gap-2">
                <span
                    className=" text-center text-xs  bg-green-300 text-white font-bold p-2 border-round border-1 border-green-800 scalein animation-duration-500 animation-iteration-1"
                    key={test?.correctAnswers}
                >
                    Score : {test?.correctAnswers}
                </span>
                <span className=" text-center  text-xs bg-blue-300 text-white font-bold  p-2 border-round border-1 border-green-800 scalein animation-duration-500 animation-iteration-1">
                    Question : {test?.currentQuestion + 1}/{test?.questions?.length}
                </span>
            </div>
        </div>
    );
}
