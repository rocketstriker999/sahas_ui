import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "primereact/hooks";
import Loading from "../common/Loading";
import { requestAPI } from "../../utils";
import NoContent from "../common/NoContent";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";

export default function PlayerVideo({ mediaItem }) {
    const [playBackTimes, setPlayBackTimes] = useLocalStorage({}, "videoPlayBacks");
    const videoRef = useRef(null); // Reference to the video element
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [stream, setStream] = useState();
    const [showQualityDropdown, setShowQualityDropdown] = useState(false);
    const { selector, id } = useParams();

    useEffect(() => {
        requestAPI({
            requestPath: `extract/${selector}/${id}/${mediaItem?.id}`,
            setLoading: setLoading,
            onRequestFailure: setError,
            onResponseReceieved: ({ stream = false }, _) => setStream(stream),
        });
    }, [id, mediaItem, selector]);

    if (loading) {
        return <Loading />;
    }

    if (!stream || error) {
        return <NoContent error="Couldn't Stream The Media" />;
    }

    if (stream)
        return (
            <div className="relative w-full">
                <video
                    onError={setStream}
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
                    <source key={stream} src={stream} type="video/mp4"></source>
                </video>
                <div className="absolute bottom-0 right-0 m-2">
                    <Button
                        icon="pi pi-cog"
                        className="p-button-text p-button-plain text-white border-none border-round"
                        onClick={() => setShowQualityDropdown(!showQualityDropdown)}
                        style={{ background: "rgba(126, 125, 125, 0.52)", width: "30px", height: "30px" }}
                    />
                    {showQualityDropdown && (
                        <div className="absolute border-round right-0 py-1" style={{ bottom: "35px", background: "rgba(0, 0, 0, 0.9)", border: "1px solid rgba(255, 255, 255, 0.2)", minWidth: "120px"}}>
                            {["Auto", "1080p", "720p", "480p", "360p"].map((quality) => (
                                <div key={quality} className="cursor-pointer text-white text-xs px-4 py-2" onClick={() => setShowQualityDropdown(false)} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                                    {quality}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
}