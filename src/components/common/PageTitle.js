import { useNavigate } from "react-router-dom";

export default function PageTitle({ title, action }) {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-800 text-white px-3 font-semibold shadow-3 flex align-items-center justify-content-between">
            <div className="flex gap-2 align-items-center" onClick={() => navigate(-1)}>
                <i className="pi pi-angle-left"></i>
                <p>{title}</p>
            </div>
            {action}
        </div>
    );
}
