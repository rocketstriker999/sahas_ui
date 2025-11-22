import DeviceDetector from "device-detector-js";
import { EMPTY_VALUE } from "./constants";
import moment from "moment";

const deviceDetector = new DeviceDetector();

export function getReadableDate({ date = "", removeTime = false }) {
    const parsingDate = moment(date);
    return parsingDate.isValid() ? parsingDate.format(removeTime ? "DD-MM-YY" : "DD-MM-YY HH:mm") : EMPTY_VALUE;
}

export function getWriteableDate({ date = "", removeTime = false }) {
    const parsingDate = moment(date);
    return parsingDate.isValid() ? parsingDate.format(removeTime ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm") : EMPTY_VALUE;
}

export async function generateDeviceFingerprint() {
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);

    const brand = device.device?.brand || "Unknown Brand";
    const model = device.device?.model || "Unknown Model";
    const type = device.device?.type || "Unknown Type";
    const os = device.os?.name || "Unknown OS";
    const osVersion = device.os?.version || "";
    const browser = device.client?.name || "Unknown Browser";
    const browserVersion = device.client?.version || "";
    const screenRes = `${global.screen.width}x${global.screen.height}`;

    const webglInfo = getWebGLFingerprint();
    const canvasFingerprint = getCanvasFingerprint();

    const hardwareFingerPrint = await sha256(
        [
            navigator.language,
            global.screen.width,
            global.screen.height,
            global.screen.colorDepth,
            window.devicePixelRatio,
            navigator.hardwareConcurrency,
            navigator.deviceMemory || "unknown",
            navigator.platform,
            navigator.maxTouchPoints,
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            canvasFingerprint,
            webglInfo.vendor,
            webglInfo.renderer,
        ].join("::")
    );

    return btoa(
        unescape(
            encodeURIComponent(`${type} - ${brand} ${model} - ${os}(${osVersion}) - ${browser}(${browserVersion}) - ${screenRes} | ${hardwareFingerPrint}`)
        )
    );
}

function getCanvasFingerprint() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#f60";
    ctx.fillRect(100, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Canvas Fingerprint!", 2, 15);
    return canvas.toDataURL();
}

function getWebGLFingerprint() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    let vendor = "unknown";
    let renderer = "unknown";

    if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
            vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
    }

    return { vendor, renderer };
}

async function sha256(input) {
    const buffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getFilterNameFormalized(input) {
    return input.charAt(0).toUpperCase().concat(input.slice(1));
}

export function getFileAcceptType(type) {
    if (type === "video") {
        return "video/*";
    }

    if (type === "pdf") {
        return "application/pdf";
    }

    return "image/*";
}

//resource getter
export const getMedia = (resource) => process.env.REACT_APP_BACKEND_SERVER.concat(process.env.REACT_APP_RESOURCES_PATH).concat(resource);

export const hasRequiredAuthority = (authorities, requiredAuthority) => authorities.includes(requiredAuthority);
