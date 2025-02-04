import { Fragment, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "primereact/hooks";
import Loading from "../common/Loading";
import { requestService } from "../../utils";
import NoContent from "../common/NoContent";

export default function PlayerVideo({ id }) {
    const [playBackTimes, setPlayBackTimes] = useLocalStorage({}, "videoPlayBacks");
    const videoRef = useRef(null); // Reference to the video element
    const [loading, setLoading] = useState();
    const [sources, setSources] = useState();

    useEffect(() => {
        requestService({
            requestService: process.env.REACT_APP_STREAM,
            requestPath: id,
            setLoading: setLoading,
            onResponseReceieved: (sources, responseCode) => {
                if (sources && responseCode === 200) {
                    setSources(sources);
                }
            },
        });
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return sources.length ? (
        <video
            onPlay={() => playBackTimes[id] && (videoRef.current.currentTime = playBackTimes[id])}
            width="100%"
            ref={videoRef}
            controls
            autoPlay
            controlsList="nodownload"
            onTimeUpdate={() => {
                playBackTimes[id] = videoRef.current.currentTime;
                setPlayBackTimes(playBackTimes);
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {sources.map((source) => (
                <source key={source.url} src={source.url} type="video/mp4"></source>
            ))}
        </video>
    ) : (
        <NoContent />
    );
}
