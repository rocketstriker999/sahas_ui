export function hasGroupAccess(userGroups, allowedGroups) {
    return userGroups ? userGroups.some((group) => allowedGroups.includes(group)) : false;
}

export async function generateDeviceFingerprint() {
    const canvasFingerprint = getCanvasFingerprint();
    const webglInfo = getWebGLFingerprint();

    const entropy = [
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
    ].join("::");

    const hash = await sha256(entropy);
    return hash.substring(0, 32);
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

//resource getter
export const getResource = (resource) => process.env.REACT_APP_BACKEND_SERVER.concat(process.env.REACT_APP_RESOURCES_PATH).concat(resource);
