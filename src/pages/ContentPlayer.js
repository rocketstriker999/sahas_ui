import { Fragment, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ContentSelector from "../components/content_player/ContentSelector";

export default function ContentPlayer() {
    const { contentId } = useParams();

    const [MediaPlayer, setMediaPlayer] = useState();

    const content = {
        videos: [
            {
                title: "vid1",
                urls: [
                    { name: "360P", url: "dawrfdrgdrger" },
                    { name: "720P", url: "dawrfdrgdfesserger" },
                ],
            },
            {
                title: "vid2",
                urls: [
                    { name: "360P", url: "dawrfdrgdrger" },
                    { name: "720P", url: "dawrfdrgdfesserger" },
                ],
            },
        ],
        audios: [
            { title: "aud 1", url: "grrtgh5656h6" },
            { title: "aud 2", url: "dawawdt5hh45y3t   q34awda" },
        ],
        pdfs: [
            { title: "pdf1", url: "ocn4j3f9novrf" },
            { title: "pdf2", url: "45gf45g4" },
        ],
    };

    return (
        <Fragment>
            <div className="flex h-16rem justify-content-center align-items-center bg-gray-900 shadow-4">
                {MediaPlayer ? MediaPlayer : <span className="text-white font-bold">Select Content To Start</span>}
            </div>
            <ContentSelector content={content} setMediaPlayer={setMediaPlayer} />
        </Fragment>
    );
}
