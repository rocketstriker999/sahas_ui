import { Fragment, useState } from "react";
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
                    { name: "360P", url: "https://www.w3schools.com/tags/mov_bbb.mp4" },
                    { name: "720P", url: "https://www.w3schools.com/tags/mov_bbb.mp4" },
                ],
            },
            {
                title: "vid2",
                urls: [
                    { name: "360P", url: "https://www.w3schools.com/tags/mov_bbb.mp4" },
                    { name: "720P", url: "https://www.w3schools.com/tags/mov_bbb.mp4" },
                ],
            },
        ],
        audios: [
            { title: "aud 1", url: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" },
            { title: "aud 2", url: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" },
        ],
        pdfs: [
            { title: "pdf1", url: "ocn4j3f9novrf" },
            { title: "pdf2", url: "45gf45g4" },
        ],
    };

    return (
        <Fragment>
            <div className="flex justify-content-center align-items-center bg-gray-900 shadow-4">
                {MediaPlayer ? MediaPlayer : <p className="text-white font-bold">Select Content To Start</p>}
            </div>
            <ContentSelector content={content} setMediaPlayer={setMediaPlayer} />
        </Fragment>
    );
}
