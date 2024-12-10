import { Divider } from "primereact/divider";
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
        // <Fragment>
        //     <TabMenu model={tabItems} activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}></TabMenu>
        //     {activeTab === 0 &&
        //         (content.videos.length > 0 ? (
        //             content.videos.map((video) => (
        //                 <div onClick={() => setMediaPlayer(<PlayerVideo source={video.urls} />)}>
        //                     <p>{video.title}</p>
        //                     <Divider />
        //                 </div>
        //             ))
        //         ) : (
        //             <NoContent />
        //         ))}
        //     {activeTab === 1 &&
        //         (content.pdfs.length > 0 ? (
        //             content.pdfs.map((pdf) => (
        //                 <div onClick={() => setMediaPlayer(<PlayerPDF source={pdf.url} />)}>
        //                     <p>{pdf.title}</p>
        //                     <Divider />
        //                 </div>
        //             ))
        //         ) : (
        //             <NoContent />
        //         ))}
        //     {activeTab === 2 &&
        //         (content.audios.length > 0 ? (
        //             content.audios.map((audio) => (
        //                 <div onClick={() => setMediaPlayer(<PlayerAudio source={audio.url} />)}>
        //                     <p>{audio.title}</p>
        //                     <Divider />
        //                 </div>
        //             ))
        //         ) : (
        //             <NoContent />
        //         ))}
        // </Fragment>

        <Fragment>
            <TabMenu model={tabItems} activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}
                className="mb-4 surface-card"></TabMenu>
            <div className="px-3">
                {activeTab === 0 &&
                    (content.videos.length > 0 ? (
                        content.videos.map((video) => (
                            <div
                                className="p-3 mb-3 surface-card border-round shadow-1 flex justify-content-between align-items-center"
                                onClick={() => setMediaPlayer(<PlayerVideo source={video.urls} />)}>
                                <span className="text-lg font-bold">{video.title}</span>
                                <i className="pi pi-play text-primary"></i>
                            </div>
                        ))
                    ) : (
                        <NoContent />
                    ))}
                {activeTab === 1 &&
                    (content.pdfs.length > 0 ? (
                        content.pdfs.map((pdf) => (
                            <div className="p-3 mb-3 surface-card border-round shadow-1 flex justify-content-between align-items-center"
                            onClick={() => setMediaPlayer(<PlayerPDF source={pdf.url} />)}>
                                <span className="text-lg font-bold">{pdf.title}</span>
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
                            className="p-3 mb-3 surface-card border-round shadow-1 flex justify-content-between align-items-center"
                             onClick={() => setMediaPlayer(<PlayerAudio source={audio.url} />)}>
                                <span className="text-lg font-bold">{audio.title}</span>
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
