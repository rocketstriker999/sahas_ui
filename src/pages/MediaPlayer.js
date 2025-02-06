import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MediaSelector from "../components/content_player/MediaSelector";
import { requestAPI } from "../utils";
import Loading from "../components/common/Loading";

export default function MediaPlayer() {
    const { selector, id } = useParams();
    const [MediaPlayer, setMediaPlayer] = useState();
    const [media, setMedia] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        requestAPI({
            requestPath: `media/${selector}/${id}`,
            onResponseReceieved: (media, responseCode) => {
                if (media && responseCode === 200) {
                    setMedia(media);
                } else {
                    navigate("/forbidden");
                }
            },
            setLoading: setLoading,
        });
    }, [selector, id, navigate]);

    if (loading) {
        return <Loading />;
    }

    if (!loading && media) {
        return (
            <Fragment>
                <div className="bg-gray-900 shadow-4 text-white">{MediaPlayer ? MediaPlayer : <p className="font-bold p-4 m-0">Select Media To Start</p>}</div>
                <MediaSelector media={media} setMediaPlayer={setMediaPlayer} />
            </Fragment>
        );
    }
}
