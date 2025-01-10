import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import { saveAs } from "file-saver";
import { Button } from "primereact/button";
import { pdfjs } from "react-pdf";

export default function PlayerPDF(pdf) {
    return <iframe src={`/media/private/pdfs/${pdf.gd_id}`} width="100%" height="600px" />;
}
