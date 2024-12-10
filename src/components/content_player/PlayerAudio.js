import { Fragment } from 'react';
import { AudioPlayer } from 'react-audio-play';

export default function PlayerAudio({ source }) {
    return (
        <Fragment>
            <div className="flex flex-column align-items-center w-full px-4">
                <h2 className="text-white font-bold mb-4">Audio Player Title</h2>
                <div className="border-round surface-card w-full">
                {/* <AudioPlayer src={source}/> */}
                {/* For Testing */}
                <AudioPlayer src="https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" />
                </div>
            </div>
        </Fragment>
    );
}