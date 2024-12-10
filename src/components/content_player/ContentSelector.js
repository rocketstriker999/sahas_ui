import { Divider } from "primereact/divider";
import { TabMenu } from "primereact/tabmenu";
import { Fragment, useState } from "react";

export default function ContentSelector({ content }) {
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
                content.videos.map((video) => (
                    <div>
                        <p>{video.title}</p>
                        <Divider />
                    </div>
                ))}
            {activeTab === 1 &&
                content.pdfs.map((pdf) => (
                    <div>
                        <p>{pdf.title}</p>
                        <Divider />
                    </div>
                ))}
            {activeTab === 2 &&
                content.audios.map((audio) => (
                    <div>
                        <p>{audio.title}</p>
                        <Divider />
                    </div>
                ))}
        </Fragment>
    );
}
