import { useEffect, useRef } from "react";

export default function PlayerAudio({ source }) {
    const audioRef = useRef(null); // Reference to the audio element

    useEffect(() => {
        // Set the audio playhead to start at 5 seconds when the component is mounted
        if (audioRef.current) {
            audioRef.current.currentTime = 5; // Start at 5 seconds
        }
    }, []); // Empty dependency array to run only once when the component mounts

    return (
        <div className="p-4">
            <audio width="100%" ref={audioRef} controls autoplay controlsList="nodownload" oncontextmenu="return false;">
                <source src={source} type="audio/mp3" />
            </audio>
        </div>
    );
}
