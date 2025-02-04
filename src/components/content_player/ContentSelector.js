import { TabMenu } from "primereact/tabmenu";
import { Fragment, useState } from "react";
import PlayerVideo from "./PlayerVideo";
import PlayerAudio from "./PlayerAudio";
import PlayerPDF from "./PlayerPDF";
import NoContent from "../common/NoContent";

export default function ContentSelector({ content, setMediaPlayer }) {
    const [activeTab, setActiveTab] = useState(0);

    const organizedContent = content.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = []; // Create an empty array for this type if it doesn't exist
        }
        acc[item.type].push(item); // Add the item to the corresponding type group
        return acc;
    }, {});

    const tabItems = [
        { label: "Videos", icon: "pi pi-video", content: organizedContent.video, media_player: PlayerVideo },
        { label: "PDFs", icon: "pi pi-file-pdf", content: organizedContent.pdf, media_player: PlayerPDF },
        { label: "Audios", icon: "pi pi-headphones", content: organizedContent.audio, media_player: PlayerAudio },
    ];

    const currentTab = tabItems[activeTab];

    return (
        <Fragment>
            <TabMenu model={tabItems} activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)} className="mb-4"></TabMenu>
            <div className="px-3">
                {currentTab.content?.length ? (
                    currentTab.content
                        ?.sort((itemA, itemB) => itemA.view_index - itemB.view_index)
                        .map((contentItem) => (
                            <div
                                key={contentItem.id}
                                onClick={() => setMediaPlayer(<currentTab.media_player id={contentItem.id} />)}
                                className="p-3 mb-3 border-round shadow-2 flex justify-content-between align-items-center"
                            >
                                <span className="text-base font-medium">{contentItem.title}</span>
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
