import { useState } from "react";

import NoContent from "../common/NoContent";
import { Ripple } from "primereact/ripple";

export default function MediaSelector({ currentTab, setMediaPlayer }) {
    const [activeItem, setActiveItem] = useState();

    return (
        <div className="px-3 overflow-auto">
            {currentTab.media?.length ? (
                currentTab.media.map((mediaItem, index) => (
                    <div
                        key={mediaItem.id}
                        onClick={() => {
                            setMediaPlayer(<currentTab.media_player mediaItem={mediaItem} />);
                            setActiveItem(index);
                        }}
                        className={`p-3 mb-3 border-round shadow-2 flex justify-content-between align-items-center relative overflow-hidden gap-2 ${
                            index === activeItem && "bg-black-alpha-20"
                        }`}
                    >
                        <Ripple
                            pt={{
                                root: { style: { background: "rgba(102, 189, 240, 0.4)" } },
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
    );
}
