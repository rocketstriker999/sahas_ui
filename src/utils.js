import platform from "platform";

export function hasGroupAccess(userGroups, allowedGroups) {
    return userGroups ? userGroups.some((group) => allowedGroups.includes(group)) : false;
}

export async function requestAPI({
    requestHeaders = {},
    requestPath = "/",
    requestMethod = "GET",
    requestGetQuery = false,
    requestPostBody = false,
    onRequestStart = false,
    setLoading = false,
    onResponseReceieved = false,
    onRequestFailure = false,
    onRequestEnd = false,
    deviceInfo = {
        "Device-ID": localStorage.getItem(process.env.REACT_APP_DEVICE_KEY),
        "Device-OS": platform.os.family,
        "Device-Company": platform.product,
        "Device-Browser": platform.name,
        "Device-Browser-Version": platform.version,
    },
} = {}) {
    if (onRequestStart) onRequestStart();
    if (setLoading) setLoading(true);

    //api specific path
    requestPath = process.env.REACT_APP_REVERSE_PROXY_API_PATH.concat(requestPath);

    if (requestGetQuery) {
        requestPath = requestPath + "?";
        requestPath =
            requestPath +
            Object.keys(requestGetQuery)
                .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(requestGetQuery[key]))
                .join("&");
    }

    const fetchOptions = {
        // Adding headers to the request
        //headers: {requestHeaders,...currentDevice},
        headers: {
            "Content-Type": "application/json",
            ...deviceInfo,
            ...requestHeaders,
        },
        // Adding method type
        method: requestMethod.toUpperCase(),
        //Adding Cookies as well
        credentials: "same-origin",
    };

    if (requestPostBody) {
        fetchOptions.body = JSON.stringify(requestPostBody);
    }

    try {
        const response = await fetch(requestPath, fetchOptions);
        const jsonResponse = await response.json();
        if (onResponseReceieved) onResponseReceieved(jsonResponse, response.status);
    } catch (e) {
        if (onRequestFailure) onRequestFailure(e);
    } finally {
        if (setLoading) setLoading(false);
    }
    if (onRequestEnd) onRequestEnd();
}

//returns current authentication token
// requestHelper.getData = (key) => {
//     return localStorage.getItem(key) === null ? false : localStorage.getItem(key);
// }

//sets current authentication token
//requestHelper.saveData = (key, value) => { localStorage.setItem(key, value) };

//Check Device Id
// if (!requestHelper.getData("DEVICEID"))
//     window.electron.getDeviceID((deviceId) => requestHelper.saveData("DEVICEID", deviceId));
