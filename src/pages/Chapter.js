import { useParams } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";

export default function Chapter() {
    const { chapterId } = useParams();
    const { requestAPI } = useAppContext();

    return <p>Media goes here</p>;
}
