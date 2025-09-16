import { Tag } from "primereact/tag";
import { RUPEE } from "../../constants";

export default function Course({ title, description, price, image }) {
    return (
        <div className="border-1 border-gray-300 border-round  flex flex-column gap-2 overflow-hidden pb-2 ">
            <img className="h-8rem " src={"https://dummyimage.com/512x158/000/fff"} alt={title} />
            <div className="flex align-items-center justify-content-between px-2">
                <span className="text-sm font-semibold">{title}</span>
                <Tag severity="info" value={`${price} ${RUPEE}`}></Tag>
            </div>
            <span className="text-xs px-2">{description}</span>
        </div>
    );
}
