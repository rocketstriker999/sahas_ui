import { useNavigate } from "react-router-dom";

export default function PageTitle({ title, action, allow_back = true, onBackPress = false }) {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-800 text-white px-3 font-semibold shadow-3 flex align-items-center justify-content-between">
            <div className="flex gap-2 align-items-center">
                {allow_back && (
                    <i
                        className="pi pi-angle-left"
                        onClick={() => {
                            if (onBackPress) {
                                return onBackPress();
                            }
                            navigate(-1);
                        }}
                    ></i>
                )}
                <p>{title}</p>
            </div>
            {action}
        </div>
    );
}
