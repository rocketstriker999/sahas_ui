import { Divider } from "primereact/divider";
import { TabMenu } from "primereact/tabmenu";
import { Fragment, useState } from "react";
import PlayerVideo from "./PlayerVideo";
import PlayerAudio from "./PlayerAudio";
import PlayerPDF from "./PlayerPDF";
import NoContent from "../common/NoContent";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString();

export default function ContentSelector({ content, setMediaPlayer }) {
    const [activeTab, setActiveTab] = useState(0);

    const tabItems = [
        { label: "Videos", icon: "pi pi-video" },
        { label: "PDFs", icon: "pi pi-file-pdf" },
        { label: "Audios", icon: "pi pi-headphones" },
    ];
    return (
        <Fragment>
            <TabMenu model={tabItems} activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}></TabMenu>
            {activeTab === 0 &&
                (content.videos.length > 0 ? (
                    content.videos.map((video) => (
                        <div onClick={() => setMediaPlayer(<PlayerVideo sources={video.urls} />)}>
                            <p>{video.title}</p>
                            <Divider />
                        </div>
                    ))
                ) : (
                    <NoContent />
                ))}
            {activeTab === 1 &&
                (content.pdfs.length > 0 ? (
                    content.pdfs.map((pdf) => (
                        // <div onClick={() => setMediaPlayer(<PlayerPDF source={pdf.url} />)}>
                        //     <p>{pdf.title}</p>
                        //     <Divider />
                        // </div>

                        // Used Dummy PDF File link
                        <div onClick={() => setMediaPlayer(<PlayerPDF source="https://getsamplefiles.com/download/pdf/sample-1.pdf" />)}>
                        <p>{pdf.title}</p>
                        <Divider />
                    </div>
                    ))
                ) : (
                    <NoContent />
                ))}
            {activeTab === 2 &&
                (content.audios.length > 0 ? (
                    content.audios.map((audio) => (
                        <div onClick={() => setMediaPlayer(<PlayerAudio source={audio.url} />)}>
                            <p>{audio.title}</p>
                            <Divider />
                        </div>
                    ))
                ) : (
                    <NoContent />
                ))}
        </Fragment>
    );
}
