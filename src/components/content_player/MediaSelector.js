import { TabMenu } from "primereact/tabmenu";
import { Fragment, useMemo, useState } from "react";
import PlayerVideo from "./PlayerVideo";
import PlayerAudio from "./PlayerAudio";
import PlayerPDF from "./PlayerPDF";
import NoContent from "../common/NoContent";
import { Ripple } from 'primereact/ripple';

export default function MediaSelector({ media, setMediaPlayer }) {
    const organizedMedia = useMemo(
        () =>
            media.reduce((acc, mediaItem) => {
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
        () => [
            { label: "Videos", icon: "pi pi-video", media: organizedMedia.video, media_player: PlayerVideo },
            { label: "PDFs", icon: "pi pi-file-pdf", media: organizedMedia.pdf, media_player: PlayerPDF },
            { label: "Audios", icon: "pi pi-headphones", media: organizedMedia.audio, media_player: PlayerAudio },
        ],
        [organizedMedia]
    );

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const currentTab = useMemo(() => tabItems[activeTabIndex], [activeTabIndex, tabItems]);

    return (
        <Fragment>
            <TabMenu model={tabItems} activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)} className="mb-4"></TabMenu>
            <div className="px-3">
                {currentTab.media?.length ? (
                    currentTab.media.map((mediaItem) => (
                        <div
                            key={mediaItem.id}
                            onClick={() => setMediaPlayer(<currentTab.media_player mediaItem={mediaItem} />)}
                            className="p-3 mb-3 border-round shadow-2 flex justify-content-between align-items-center relative overflow-hidden gap-2"
                        >
                            <Ripple
                                pt={{
                                    root: { style: { background: 'rgba(102, 189, 240, 0.4)' } }
                                }}
                            />
                            <span className="text-base font-medium">{mediaItem.title}</span>
                            <i className="pi pi-play text-primary"></i>
                        </div>
                    ))
                ) : (
                    <NoContent />
                )}
            </div>
        </Fragment>
    );
}
