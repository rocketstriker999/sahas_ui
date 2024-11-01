

export function hasGroupAccess(userGroups,allowedGroups){
    return userGroups.some(group => allowedGroups.includes(group))
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


