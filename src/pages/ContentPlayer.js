import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentSelector from "../components/content_player/ContentSelector";
import { requestProxy } from "../utils";
import Loading from "../components/common/Loading";

export default function ContentPlayer({ contentType }) {
    const { contentId } = useParams();
    const [MediaPlayer, setMediaPlayer] = useState();
    const [content, setContent] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        requestProxy({
            requestPath: `/api/content/${contentType}/${contentId}`,
            onResponseReceieved: (content, responseCode) => {
                if (content && responseCode === 200) {
                    setContent(content);
                }
            },
            setLoading: setLoading,
        });
    }, [contentId, contentType]);

    if (loading) {
        return <Loading />;
    }

    if (!loading && content) {
        return (
            <Fragment>
                <div className="flex justify-content-center align-items-center bg-gray-900 shadow-4 text-white">
                    {MediaPlayer ? MediaPlayer : <p className="font-bold">Select Content To Start</p>}
                </div>
                <ContentSelector content={content} setMediaPlayer={setMediaPlayer} />
            </Fragment>
        );
    }
}
