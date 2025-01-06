import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Fragment, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { Button } from "primereact/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PlayerPDF({ source = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" }) {
    const [numPages, setNumPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Fragment>
            <div className="flex justify-content-center gap-3">
                <Button onClick={() => setCurrentPage((page) => --page)} disabled={currentPage <= 1} icon="pi pi-angle-left" rounded text />
                <p>
                    Page {currentPage} of {numPages}
                </p>
                <Button onClick={() => setCurrentPage((page) => ++page)} disabled={currentPage >= (numPages ?? -1)} icon="pi pi-angle-right" rounded text />
            </div>
            <Document
                renderMode="canvas"
                className="my-react-pdf  h-30rem overflow-scroll"
                file={source}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                <Page className="flex justify-content-center " renderAnnotationLayer={false} renderTextLayer={false} pageNumber={currentPage} />
            </Document>
        </Fragment>
    );
}
