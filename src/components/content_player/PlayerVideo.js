import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "primereact/hooks";
import Loading from "../common/Loading";
import { requestAPI } from "../../utils";
import NoContent from "../common/NoContent";
import { useParams } from "react-router-dom";

export default function PlayerVideo({ mediaItem }) {
    const [playBackTimes, setPlayBackTimes] = useLocalStorage({}, "videoPlayBacks");
    const videoRef = useRef(null); // Reference to the video element
    const [loading, setLoading] = useState();
    const [sources, setSources] = useState();

    const { selector, id } = useParams();

    useEffect(() => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            setLoading: setLoading,
            onResponseReceieved: ({ sources }, responseCode) => {
                if (sources && responseCode === 200) {
                    setSources(sources);
                }
            },
        });
    }, [id, mediaItem, selector]);

    if (loading) {
        return <Loading />;
    }

    return sources?.length ? (
        <video
            onPlay={() => playBackTimes[mediaItem.id] && (videoRef.current.currentTime = playBackTimes[mediaItem.id])}
            width="100%"
            ref={videoRef}
            controls
            autoPlay
            controlsList="nodownload"
            onTimeUpdate={() => {
                playBackTimes[mediaItem.id] = videoRef.current.currentTime;
                setPlayBackTimes(playBackTimes);
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {sources.map((source) => (
                <source key={source.url} src={source.url} type="video/mp4"></source>
            ))}
        </video>
    ) : (
        <NoContent error="Couldn't Stream The Media" />
    );
}
