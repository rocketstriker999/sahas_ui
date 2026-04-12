import { TEXT_SUBTITLE } from "../../style";

export default function MediaPlayer({ content }) {
    return (
        <div className={`bg-black-alpha-70 font-bold text-white ${TEXT_SUBTITLE}`}>
            <div className="bg-black-alpha-90 h-24rem mt-2">Player</div>
        </div>
    );
}
