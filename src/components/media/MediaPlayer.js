import AudioPlayer from "./AudioPlayer";
import PDFPlayer from "./PDFPlayer";
import VideoPlayer from "./VideoPlayer";

export default function MediaPlayer(media) {
    if (media?.type?.toLowerCase() === "video") {
        return <VideoPlayer {...media} />;
    }

    if (media?.type?.toLowerCase() === "pdf") {
        return <PDFPlayer {...media} />;
    }

    if (media?.type?.toLowerCase() === "audio") {
        return <AudioPlayer {...media} />;
    }
}
