import { useEffect, useRef } from "react";

export default function PlayerVideo({ source }) {
    const videoRef = useRef(null); // Reference to the video element

    useEffect(() => {
        // Set the video playhead to start at 5 seconds when the component is mounted
        if (videoRef.current) {
            videoRef.current.currentTime = 5; // Start at 5 seconds
        }
    }, []); // Empty dependency array to run only once when the component mounts

    return (
        <video width="100%" ref={videoRef} controls autoplay controlsList="nodownload" oncontextmenu="return false;">
            <source src={source[0].url} type="video/mp4" />
        </video>
    );
}
