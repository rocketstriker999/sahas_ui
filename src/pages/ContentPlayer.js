import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentSelector from "../components/content_player/ContentSelector";
import { requestProxy } from "../utils";
import Loading from "../components/common/Loading";

export default function ContentPlayer({ contentType }) {
    const { contentId } = useParams();
    const [MediaPlayer, setMediaPlayer] = useState();
    const [content, setContent] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        requestProxy({
            requestPath: `/api/content/${contentType}/${contentId}`,
            onResponseReceieved: (content, responseCode) => {
                if (content && responseCode === 200) {
                    setContent(content);
                }
                if (responseCode === 401) {
                    navigate("/forbidden");
                }
            },
            setLoading: setLoading,
        });
    }, [contentId, contentType, navigate]);

    if (loading) {
        return <Loading />;
    }

    if (!loading && content) {
        return (
            <Fragment>
                <div className="bg-gray-900 shadow-4 text-white">
                    {MediaPlayer ? MediaPlayer : <p className="font-bold p-4 m-0">Select Content To Start</p>}
                </div>
                <ContentSelector content={content} setMediaPlayer={setMediaPlayer} />
            </Fragment>
        );
    }
}
