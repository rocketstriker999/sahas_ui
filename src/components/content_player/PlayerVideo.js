import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "primereact/hooks";
import Loading from "../common/Loading";
import { requestAPI } from "../../utils";
import NoContent from "../common/NoContent";
import { useNavigate, useParams } from "react-router-dom";

export default function PlayerVideo({ mediaItem }) {
    const [playBackTimes, setPlayBackTimes] = useLocalStorage({}, "videoPlayBacks");
    const videoRef = useRef(null); // Reference to the video element
    const [loading, setLoading] = useState();
    const [sources, setSources] = useState();
    const [error, setError] = useState();
    const { selector, id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (sources, responseCode) => (sources && responseCode === 200 ? setSources(sources) : navigate("/forbidden")),
        });
    }, [id, mediaItem, navigate, selector, error]);

    if (loading) {
        return <Loading />;
    }

    const fetchSourcesWithCacheSkip = () => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            requestGetQuery: { skip_cache: true },
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (sources, responseCode) => (sources && responseCode === 200 ? setSources(sources) : navigate("/forbidden")),
        });
    };

    return sources?.length && !error ? (
        <video
            onLoadedData={() => setError(false)}
            onError={() => setError(true)}
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
        <NoContent error="Couldn't Stream The Media" retry={fetchSourcesWithCacheSkip} />
    );
}
