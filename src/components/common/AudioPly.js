import { AudioPlayer as CustomAudioPlayer } from 'react-audio-play';

export default function AudioPly() {
    return (
        <div className="flex flex-column align-items-center py-4 px-2 surface-100 shadow-2">
            <h1 className="text-primary font-bold mb-3 text-base md:text-xl">Audio Player title</h1>
            <div className="w-full md:w-8 flex flex-column align-items-center">
                {/* Audio Player Container */}
                <div className="border-round shadow-2 surface-card w-full">
                    <CustomAudioPlayer
                        src="https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
                        
                    />
                </div>
            </div>
        </div>
    );
}

