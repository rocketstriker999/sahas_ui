import { TabView, TabPanel } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { requestAPI } from "../../utils/utils";
import { useParams } from "react-router-dom";
import ContentPlayer from "../common/ContentPlayer";
import PDFViewer from "../common/PDFViewer";
import { pdfjs } from 'react-pdf';
import AudioPly from "../common/AudioPly";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString();

export default function ContentSections({ config, productId }) {
    const [demoContent, setDemoContent] = useState();
    const [loading, setLoading] = useState();
    useEffect(() => {
        //hit API Once
        requestAPI({
            requestPath: `products/${productId}/demo`,
            setLoading: setLoading,
            onResponseReceieved: (demoContent, responseCode) => {
                if (demoContent && responseCode === 200) {
                    setDemoContent(demoContent);
                }
            },
        });
    }, [productId]);

    if (loading && !demoContent) {
        return <p>Loading for demo Content</p>;
    }
    if (demoContent && !loading) {
        return (
            <div className="bg-black-alpha-80 p-4 font-semibold text-white">
                <p className="text-base md:text-xl mt-0">Demo For Product 1</p>
                {/* <ContentPlayer /> */}
                <PDFViewer />
                {/* <AudioPly /> */}
                <p className="text-base md:text-xl">{config.title}</p>
                <TabView
                    pt={{
                        panelContainer: classNames("border-noround"),
                        nav:classNames("justify-content-between md:justify-content-around"),
                    }}
                >
                    {config.sections.map((section) => (
                        <TabPanel
                            header={section.title}
                            leftIcon={`pi ${section.icon} mr-2`}
                            className=""
                            pt={{
                                headeraction:classNames("p-2 md:p-4 text-xs md:text-base"),
                                content:classNames("text-xs md:text-base")
                            }}
                            
                        >
                            {demoContent[section.key] ? (
                                demoContent[section.key].map(
                                    (demoItem, index) => (
                                        <div
                                            className={classNames(
                                                "border-1 border-round-xs flex px-4 align-items-center ",
                                                {
                                                    "mb-2":
                                                        index !==
                                                        demoContent[section.key]
                                                            .length -
                                                            1,
                                                }
                                            )}
                                        >
                                            <p className="flex-1 font-bold">
                                                {index + 1}. {demoItem.title}
                                            </p>
                                            <span className="text-sm font-semibold">
                                                {demoItem.duration
                                                    ? demoItem.duration
                                                    : "--"}
                                            </span>
                                        </div>
                                    )
                                )
                            ) : (
                                <span className="font-bold">
                                    No Content Found
                                </span>
                            )}
                        </TabPanel>
                    ))}
                </TabView>
            </div>
        );
    }
}
