import { useLocalStorage } from "primereact/hooks";
import { useRef, useState } from "react";
import NoContent from "../common/NoContent";

export default function AudioPlayer({ id, cdn_url }) {
    const [playBackTimes, setPlayBackTimes] = useLocalStorage({}, "audioPlayBacks");
    const audioRef = useRef(null);

    const [error, setError] = useState();

    if (error) return <NoContent />;

    return (
        <div className="p-3">
            <audio
                onError={() => setError(true)}
                onPlay={() => !!playBackTimes[id] && (audioRef.current.currentTime = playBackTimes[id])}
                className="w-full"
                ref={audioRef}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                disablePictureInPicture
                onTimeUpdate={() => {
                    playBackTimes[id] = audioRef.current.currentTime;
                    setPlayBackTimes(playBackTimes);
                }}
                onContextMenu={(e) => e.preventDefault()}
            >
                <source src={cdn_url} type="audio/mpeg" />
            </audio>
        </div>
    );
}
