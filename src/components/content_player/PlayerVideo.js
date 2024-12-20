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
            requestPath: `/media/private/videos/${video.yt_id}`,
            setLoading: setLoading,
            onResponseReceieved: (sources, responseCode) => {
                if (sources && responseCode === 200) {
                    setSources(sources);
                }
            },
        });
    }, [video]);

    if (loading) {
        return <Loading />;
    }

    if (sources && sources.length > 0) {
        return (
            <Fragment>
                <video
                    onPlay={() => playBackTimes[video.yt_id] && (videoRef.current.currentTime = playBackTimes[video.yt_id])}
                    width="100%"
                    ref={videoRef}
                    controls
                    autoPlay
                    controlsList="nodownload"
                    onTimeUpdate={() => {
                        playBackTimes[video.yt_id] = videoRef.current.currentTime;
                        setPlayBackTimes(playBackTimes);
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {sources.map((source) => (
                        <source key={source.url} src={source.url} type="video/mp4"></source>
                    ))}
                </video>
            </Fragment>
        );
    }
}
