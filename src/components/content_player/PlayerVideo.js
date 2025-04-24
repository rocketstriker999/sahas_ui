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
    const [streamSet, setStreamSet] = useState();
    const { selector, id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            setLoading: setLoading,
            onRequestFailure: setStreamSet({ stream_broken: true }),
            onResponseReceieved: (streams, responseCode) =>
                streams && responseCode === 200 ? setStreamSet({ stream_broken: streams.length > 0 ? false : true, streams }) : navigate("/forbidden"),
        });
    }, [id, mediaItem, navigate, selector]);

    const fetchSourcesWithCacheSkip = () => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            requestGetQuery: { skip_cache: true },
            setLoading: setLoading,
            onRequestFailure: setStreamSet({ stream_broken: true }),
            onResponseReceieved: (streams, responseCode) =>
                streams && responseCode === 200 ? setStreamSet({ stream_broken: streams.length > 0 ? false : true, streams }) : navigate("/forbidden"),
        });
    };

    if (loading) {
        return <Loading />;
    }

    if (streamSet?.stream_broken) {
        return <NoContent error="Couldn't Stream The Media" retry={fetchSourcesWithCacheSkip} />;
    }

    if (streamSet?.streams?.length > 0)
        return (
            <video
                onLoadedData={() => setStreamSet((prev) => ({ ...prev, stream_broken: false }))}
                onError={() => setStreamSet({ stream_broken: true })}
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
                {streamSet.streams.map((stream) => (
                    <source key={stream.url} src={stream.url} type="video/mp4"></source>
                ))}
            </video>
        );
}
