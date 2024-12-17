import { Fragment, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "primereact/hooks";
import { requestProxy } from "../../utils";
import Loading from "../common/Loading";

export default function PlayerVideo({ video }) {
    const [playBackTimes, setPlayBackTimes] = useLocalStorage({}, "videoPlayBacks");
    const videoRef = useRef(null); // Reference to the video element
    const [loading, setLoading] = useState();
    const [sources, setSources] = useState();

    useEffect(() => {
        requestProxy({
            requestPath: `/media/video/l5RasLjLugs`,
            setLoading: setLoading,
            onResponseReceieved: (sources, responseCode) => {
                if (sources && responseCode === 200) {
                    setSources(sources);
                }
            },
        });
    }, [video]);

    if (loading) {
        <Loading />;
    }

    if (sources) {
        return (
            <Fragment>
                <video
                    onPlay={() => (videoRef.current.currentTime = playBackTimes[video.id])}
                    width="100%"
                    ref={videoRef}
                    controls
                    autoPlay
                    controlsList="nodownload"
                    onTimeUpdate={() => {
                        playBackTimes[video.id] = videoRef.current.currentTime;
                        setPlayBackTimes(playBackTimes);
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {sources.videos?.length > 0 && <source src={sources.videos[sources.videos.length - 1]?.url} type="video/webm"></source>}
                </video>
            </Fragment>
        );
    }
}
