import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MediaSelector from "../components/content_player/MediaSelector";
import { requestAPI } from "../utils";
import Loading from "../components/common/Loading";
import { TabMenu } from "primereact/tabmenu";
import { useMemo } from "react";
import PlayerVideo from "../components/content_player/PlayerVideo";
import PlayerAudio from "../components/content_player/PlayerAudio";
import PlayerPDF from "../components/content_player/PlayerPDF";
import { useAppContext } from "../providers/ProviderAppContainer";

export default function MediaPlayer() {
    const { selector, id } = useParams();
    const [MediaPlayer, setMediaPlayer] = useState();
    const [media, setMedia] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { setApplicationError } = useAppContext();

    useEffect(() => {
        requestAPI({
            requestPath: `media/${selector}/${id}`,
            onResponseReceieved: (media, responseCode) => {
                if (media && responseCode === 200) {
                    setMedia(media);
                }

                if (responseCode === 401) {
                    setApplicationError(media.error);
                }
            },
            setLoading: setLoading,
        });
    }, [selector, id, navigate, setApplicationError]);

    const organizedMedia = useMemo(
        () =>
            media?.reduce((acc, mediaItem) => {
                if (!acc[mediaItem.type]) {
                    acc[mediaItem.type] = []; // Create an empty array for this type if it doesn't exist
                }
                acc[mediaItem.type].push(mediaItem); // Add the item to the corresponding type group
                acc[mediaItem.type] = acc[mediaItem.type].sort((mediaItemA, mediaItemB) => mediaItemA.view_index - mediaItemB.view_index);
                return acc;
            }, {}),
        [media]
    );

    const tabItems = useMemo(
        () =>
            organizedMedia
                ? [
                      { label: "Videos", icon: "pi pi-video", media: organizedMedia.video, media_player: PlayerVideo },
                      { label: "PDFs", icon: "pi pi-file-pdf", media: organizedMedia.pdf, media_player: PlayerPDF },
                      { label: "Audios", icon: "pi pi-headphones", media: organizedMedia.audio, media_player: PlayerAudio },
                  ]
                : [],
        [organizedMedia]
    );

    const currentTab = useMemo(() => tabItems[activeTabIndex], [activeTabIndex, tabItems]);

    if (loading) {
        return <Loading />;
    }

    if (!loading && media) {
        return (
            <div className="flex flex-column h-screen gap-4">
                <div className="bg-gray-900 shadow-4 text-white">
                    <p className="font-bold px-2 py-3 m-0">
                        <i className="pi pi-arrow-left mr-3" onClick={() => navigate(-1)}></i>
                        Select Media To Start
                    </p>
                    {MediaPlayer}
                </div>
                <TabMenu model={tabItems} activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)} className="overflow-visible"></TabMenu>
                <MediaSelector currentTab={currentTab} setMediaPlayer={setMediaPlayer} />
            </div>
        );
    }
}
