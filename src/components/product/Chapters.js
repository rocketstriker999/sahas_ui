import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoContent from "../common/NoContent";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import { Ripple } from 'primereact/ripple';

export default function Chapters() {
    const navigate = useNavigate();
    const { productId, subjectId } = useParams();

    const catelogue = useSelector((state) => state.stateCatelogue);

    const product = catelogue?.products?.find((product) => product.id == productId);
    const subject = catelogue?.subjects?.find((subject) => subject.id == subjectId);
    const chapters = catelogue?.chapters?.filter((chapter) => chapter.subject_id == subjectId);

    return (
        <Fragment>
            <div className="flex justify-content-between align-items-center px-3 text-sm font-bold text-primary">
                <p onClick={() => navigate(-1)}>
                    <i className="pi pi-arrow-left mr-2 text-xs"></i>Back
                </p>
                <p>{`( ${chapters?.length} Chapters )`}</p>
            </div>

            {chapters?.length > 0 ? (
                <BlockUI
                    pt={{
                        root: classNames("mx-3 "),
                        mask: "bg-black-alpha-80 align-items-start p-4",
                    }}
                    blocked={!product.has_access}
                    template={
                        <div className="text-white flex flex-column align-items-center">
                            <i className="pi pi-lock" style={{ fontSize: "3rem" }}></i>
                            <p>You Don't Have Access To This Content</p>
                            <Button label="View Demo" onClick={() => navigate(`/media-player/subject/${subject?.id}`)}></Button>
                        </div>
                    }
                >
                    {chapters.map((chapter, index) => (
                        <div
                            key={chapter.id}
                            onClick={() => navigate(`/media-player/chapter/${chapter?.id}`)}
                            className="p-3 border-round shadow-3 mb-3  flex align-items-center justify-content-between relative overflow-hidden"
                        >
                            <Ripple
                                pt={{
                                    root: { style: { background: 'rgba(102, 189, 240, 0.4)' } }
                                }}
                            />
                            <div className="flex flex-column">
                                <p className="text-sm font-bold m-0 mb-2">
                                    {index + 1}. {chapter.title}
                                </p>
                                <div className="flex gap-3">
                                    <div className="flex align-items-center">
                                        <i className="pi pi-video mr-1 text-primary"></i>
                                        <span className="text-xs text-gray-800">{chapter.videos_count} Videos</span>
                                    </div>
                                    <div className="flex align-items-center">
                                        <i className="pi pi-file-pdf mr-1 text-primary"></i>
                                        <span className="text-xs text-gray-800">{chapter.pdfs_count} Pdfs</span>
                                    </div>
                                </div>
                            </div>
                            <i className="pi pi-angle-right text-primary"></i>
                        </div>
                    ))}
                </BlockUI>
            ) : (
                <NoContent />
            )}
        </Fragment>
    );
}
