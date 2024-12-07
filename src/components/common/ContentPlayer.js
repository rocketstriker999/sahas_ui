import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function ContentPlayer({ content }) {
    const playerRef = useRef(null);

    // Retrieve the last played time from localStorage and seek to it when the player is ready
    useEffect(() => {
        const savedTime = parseFloat(localStorage.getItem('lastPlayedTime')) || 0;
        if (playerRef.current && savedTime > 0) {
            // Seek to the saved time when the player is ready
            playerRef.current.seekTo(savedTime, 'seconds');
        }
    }, []);

    // Save the current playback time to localStorage
    const handleProgress = (state) => {
        localStorage.setItem('lastPlayedTime', state.playedSeconds);
    };

    return (
        <div className="bg-black-alpha-70 font-bold text-xl text-white p-4">
            <ReactPlayer
                ref={playerRef}
                url={
                    content?.url ||
                    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
                controls={true} // Enable default controls
                onProgress={handleProgress} // Track progress and store playback time
                width="100%"
                height="100%"
                className="react-player"
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload', // Disables download button
                            disablePictureInPicture: true, // Disables picture-in-picture
                        },
                    },
                }}
            />
        </div>
    );
}
