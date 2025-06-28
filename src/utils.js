export function hasGroupAccess(userGroups, allowedGroups) {
    return userGroups ? userGroups.some((group) => allowedGroups.includes(group)) : false;
}

//resource getter
export const getResource = (resource) => process.env.REACT_APP_BACKEND_SERVER.concat(process.env.REACT_APP_RESOURCES_PATH).concat(resource);

//api requests
export async function requestAPI({
    requestHeaders = {},
    requestPath,
    requestMethod = "GET",
    requestGetQuery = false,
    requestPostBody = false,
    onRequestStart = false,
    setLoading = false,
    onResponseReceieved = false,
    onRequestFailure = false,
    onRequestEnd = false,
} = {}) {
    if (onRequestStart) onRequestStart();
    if (setLoading) setLoading(true);

    //append api backend service path
    requestPath = process.env.REACT_APP_BACKEND_SERVER.concat(process.env.REACT_APP_API_PATH).concat(requestPath);

    //api specific path
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
        headers: {
            "Content-Type": "application/json",
            device_id: localStorage.getItem(process.env.REACT_APP_DEVICE_KEY),
            ...requestHeaders,
        },
        // Adding method type
        method: requestMethod.toUpperCase(),
        //Adding Cookies as well
        credentials: "include",
    };

    if (requestPostBody) {
        fetchOptions.body = JSON.stringify(requestPostBody);
    }

    try {
        const response = await fetch(requestPath, fetchOptions);
        const jsonResponse = await response.json();
        if (onResponseReceieved) onResponseReceieved(jsonResponse, response.status);
    } catch (e) {
        if (onRequestFailure) onRequestFailure(e.toString());
    } finally {
        if (setLoading) setLoading(false);
    }
    if (onRequestEnd) onRequestEnd();
}
