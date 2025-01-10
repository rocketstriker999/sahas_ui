import React, { useState, useEffect, useRef } from "react";

export default function PlayerPDF({ pdf }) {
    return <iframe src={`/media/private/pdfs/${pdf.gd_id}`} width="100%" height="600px" />;
}
