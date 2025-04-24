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
    const { selector, id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            setLoading: setLoading,
            onRequestFailure: setSources({ are_broken: true }),
            onResponseReceieved: (sources, responseCode) =>
                sources && responseCode === 200 ? setSources({ are_broken: false, urls: sources }) : navigate("/forbidden"),
        });
    }, [id, mediaItem, navigate, selector]);

    const fetchSourcesWithCacheSkip = () => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            requestGetQuery: { skip_cache: true },
            setLoading: setLoading,
            onRequestFailure: setSources({ are_broken: true }),
            onResponseReceieved: (sources, responseCode) =>
                sources && responseCode === 200 ? setSources({ are_broken: false, urls: sources }) : navigate("/forbidden"),
        });
    };

    if (loading) {
        return <Loading />;
    }

    if (sources.are_broken) {
        return <NoContent error="Couldn't Stream The Media" retry={fetchSourcesWithCacheSkip} />;
    }

    if (sources?.length)
        return (
            <video
                onLoadedData={() => {
                    console.log("Playing Correctly");
                    setSources((prev) => ({ ...prev, are_broken: false }));
                }}
                onError={() => {
                    console.log("Error");
                    setSources({ are_broken: true });
                }}
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
                {sources.urls.map((source) => (
                    <source key={source.url} src={source.url} type="video/mp4"></source>
                ))}
            </video>
        );
}
