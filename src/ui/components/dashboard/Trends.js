import { Button } from "primereact/button";
import { Image } from 'primereact/image';

export default function Trends() {

    return (

        <div className="grid align-items-center">
            <div className="col-2">
                <div>
                    <h1 className="font-bold text-800 m-0">Top trends for the future of work</h1>
                    <p className="text-lg line-height-3 text-800">GenAI and leadership are at the core of today's skills-based economy. Get the 2024 Global Learning & Skills Trends Report to learn more.</p>
                    <Button label="See Updates" type="button" className="p-button-outlined" />
                </div>
            </div>
            <div className="col-10">
                    <Image width="100%" src="https://cms-images.udemycdn.com/96883mtakkm8/1NkfOmpshG42EUGu69VrSS/d3bc0ab5cf4c593d9dfceb2817fc935f/image_revision_12024_Angled_trend_reports.png" />
            </div>

        </div>)


}