import { TabMenu } from "primereact/tabmenu";
import { Fragment, useState } from "react";
import PlayerVideo from "./PlayerVideo";
import PlayerAudio from "./PlayerAudio";
import PlayerPDF from "./PlayerPDF";
import NoContent from "../common/NoContent";

export default function ContentSelector({ content, setMediaPlayer }) {
    const [activeTab, setActiveTab] = useState(0);

    const tabItems = [
        { label: "Videos", icon: "pi pi-video" },
        { label: "PDFs", icon: "pi pi-file-pdf" },
        { label: "Audios", icon: "pi pi-headphones" },
    ];
    return (
        <Fragment>
            <TabMenu model={tabItems} activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)} className="mb-4"></TabMenu>
            <div className="px-3">
                {activeTab === 0 &&
                    (content.videos.length > 0 ? (
                        content.videos.map((video) => (
                            <div
                                key={video.id}
                                onClick={() => setMediaPlayer(<PlayerPDF video={video} />)}
                                className="p-3 mb-3 border-round shadow-2 flex justify-content-between align-items-center"
                            >
                                <span className="text-base font-medium">{video.title}</span>
                                <i className="pi pi-play text-primary"></i>
                            </div>
                        ))
                    ) : (
                        <NoContent />
                    ))}
                {activeTab === 1 &&
                    (content.pdfs.length > 0 ? (
                        content.pdfs.map((pdf) => (
                            <div
                                key={pdf.id}
                                onClick={() => setMediaPlayer(<PlayerPDF source={pdf.url} />)}
                                className="p-3 mb-3 border-round shadow-2 flex justify-content-between align-items-center"
                            >
                                <span className="text-base font-medium">{pdf.title}</span>
                                <i className="pi pi-file-pdf text-primary"></i>
                            </div>
                        ))
                    ) : (
                        <NoContent />
                    ))}
                {activeTab === 2 &&
                    (content.audios.length > 0 ? (
                        content.audios.map((audio) => (
                            <div
                                key={audio.id}
                                onClick={() => setMediaPlayer(<PlayerAudio source={audio.url} />)}
                                className="p-3 mb-3 border-round shadow-2 flex justify-content-between align-items-center"
                            >
                                <span className="text-base font-medium">{audio.title}</span>
                                <i className="pi pi-headphones text-primary"></i>
                            </div>
                        ))
                    ) : (
                        <NoContent />
                    ))}
            </div>
        </Fragment>
    );
}
