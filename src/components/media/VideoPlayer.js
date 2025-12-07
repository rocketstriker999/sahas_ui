import { useLocalStorage } from "primereact/hooks";
import { useRef, useState } from "react";
import NoContent from "../common/NoContent";

export default function VideoPlayer({ id, cdn_url }) {
    const [playBackTimes, setPlayBackTimes] = useLocalStorage({}, "videoPlayBacks");
    const videoRef = useRef(null);

    const [error, setError] = useState();

    if (error) return <NoContent />;

    return (
        <div className="p-3">
            <video
                onError={() => setError(true)}
                onPlay={() => !!playBackTimes[id] && (videoRef.current.currentTime = playBackTimes[id])}
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
                <source key={cdn_url} src={cdn_url} type="video/mp4"></source>
            </video>
        </div>
    );
}
