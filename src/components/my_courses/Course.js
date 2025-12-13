import { useNavigate } from "react-router-dom";

export default function Course({ id, title, description, image }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/courses/${id}/subjects`)} className="border-1 border-gray-300 border-round flex flex-column gap-2 overflow-hidden pb-2">
            <img className="w-full h-8rem" src={image} alt={title} />

            <div className="flex align-items-center mt-1 px-3 gap-3">
                <span className="text-sm font-semibold text-indigo-800 flex-1">
                    <i className="pi text-xs pi-circle-fill"></i> {title}
                </span>
            </div>

            <span className="text-xs px-3">{description}</span>
        </div>
    );
}
