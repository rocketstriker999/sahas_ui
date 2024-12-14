import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentSelector from "../components/content_player/ContentSelector";
import { requestAPI } from "../utils";
import { ProgressSpinner } from "primereact/progressspinner";

export default function ContentPlayer() {
    const { contentId } = useParams();
    const [MediaPlayer, setMediaPlayer] = useState();
    const [content, setContent] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `content/${contentId}`,
            onResponseReceieved: (content, responseCode) => {
                if (content && responseCode === 200) {
                    setContent(content);
                }
            },
            setLoading: setLoading,
        });
    }, [contentId]);

    if (loading) {
        return <ProgressSpinner />;
    }

    if (!loading && content) {
        return (
            <Fragment>
                <div className="flex justify-content-center align-items-center bg-gray-900 shadow-4">
                    {MediaPlayer ? MediaPlayer : <p className="text-white font-bold">Select Content To Start</p>}
                </div>
                <ContentSelector content={content} setMediaPlayer={setMediaPlayer} />
            </Fragment>
        );
    }
}
