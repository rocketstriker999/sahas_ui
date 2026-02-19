import { useState, useEffect, useRef } from "react";

import { Document, Page } from "react-pdf";
import { saveAs } from "file-saver";
import { Button } from "primereact/button";
import { pdfjs } from "react-pdf";
import NoContent from "../common/NoContent";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;

export default function PDFPlayer({ cdn_url, title, downloadable }) {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [scale, setScale] = useState(1.0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const containerRef = useRef(null);

    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        adjustScaleToFit();
    };

    const adjustScaleToFit = () => {
        const container = containerRef.current;
        if (!container) return;

        const pdfPageWidth = 700; // Default width of a PDF page in points
        const pdfPageHeight = 500; // Default height of a PDF page in points

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const scaleWidth = containerWidth / pdfPageWidth;
        const scaleHeight = containerHeight / pdfPageHeight;

        // Choose the smaller scale to fit the entire page in the container
        setScale(Math.min(scaleWidth, scaleHeight));
    };

    useEffect(() => {
        // Adjust scale on window resize
        const handleResize = () => adjustScaleToFit();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const zoomIn = () => setScale((prevScale) => prevScale + 0.2);
    const zoomOut = () => setScale((prevScale) => Math.max(0.5, prevScale - 0.2));
    const navigatePage = (step) => {
        setCurrentPage((prevPage) => Math.min(Math.max(prevPage + step, 1), numPages));
    };

    const toggleFullScreenOrZoomOut = () => {
        const element = document.getElementById("pdf-container");

        if (isFullScreen) {
            const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;

            if (exitFullscreen) exitFullscreen.call(document);
            zoomOut();
        } else {
            const requestFullscreen =
                element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen;

            if (requestFullscreen) requestFullscreen.call(element);
        }

        setIsFullScreen(!isFullScreen);
    };

    const disableRightClick = (e) => e.preventDefault();

    const startDragHandler = (e) => {
        setStartDrag({
            x: e.clientX || e.touches[0].clientX,
            y: e.clientY || e.touches[0].clientY,
        });
        setIsDragging(true);
    };

    const dragHandler = (e) => {
        if (!isDragging) return;

        const currentX = e.clientX || e.touches[0].clientX;
        const currentY = e.clientY || e.touches[0].clientY;

        setDragOffset((prev) => ({
            x: prev.x + (currentX - startDrag.x),
            y: prev.y + (currentY - startDrag.y),
        }));

        setStartDrag({ x: currentX, y: currentY });
    };

    const endDragHandler = () => setIsDragging(false);

    return cdn_url ? (
        <div id="pdf-container" ref={containerRef}>
            <div className="flex align-items-center justify-content-center bg-blue-800 text-white">
                <Button
                    icon="pi pi-angle-left"
                    className="p-button-rounded p-button-text text-white"
                    onClick={() => navigatePage(-1)}
                    disabled={currentPage <= 1}
                />
                <span className="text-xs  font-semibold">
                    {currentPage}/{numPages}
                </span>
                <Button
                    icon="pi pi-angle-right"
                    className="p-button-rounded p-button-text text-white"
                    onClick={() => navigatePage(1)}
                    disabled={currentPage >= numPages}
                />
                <Button icon="pi pi-search-minus" className="p-button-rounded p-button-text text-white" onClick={zoomOut} />
                <Button icon="pi pi-search-plus" className="p-button-rounded p-button-text text-white" onClick={zoomIn} />
                <Button
                    icon={isFullScreen ? "pi pi-window-minimize " : "pi pi-arrows-alt "}
                    className="p-button-rounded p-button-text text-white"
                    onClick={toggleFullScreenOrZoomOut}
                />
                {!!downloadable && <Button icon="pi pi-download" className="p-button-rounded p-button-text" onClick={() => saveAs(cdn_url, `${title}.pdf`)} />}
            </div>
            <div className="flex flex-column overflow-auto bg-gray-200 h-30rem" onContextMenu={disableRightClick}>
                <div
                    className="flex justify-content-center align-items-center"
                    style={{
                        cursor: isDragging ? "grabbing" : "grab",
                        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                        transition: isDragging ? "none" : "transform 0.2s ease-out",
                    }}
                    onMouseDown={startDragHandler}
                    onMouseMove={dragHandler}
                    onMouseUp={endDragHandler}
                    onMouseLeave={endDragHandler}
                    onTouchStart={startDragHandler}
                    onTouchMove={dragHandler}
                    onTouchEnd={endDragHandler}
                >
                    <Document file={cdn_url} onLoadSuccess={onDocumentLoadSuccess} onLoadError={(error) => console.error("Error loading PDF:", error)}>
                        <Page pageNumber={currentPage} scale={scale} renderAnnotationLayer={false} renderTextLayer={false} />
                    </Document>
                </div>
            </div>
        </div>
    ) : (
        <NoContent />
    );
}
