function dateFormat(date) {
    // Return date in DD/MM/YYYY format
    const d = new Date(date);
    // return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    // All should be in 0-preceeded
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

function timeFormat(date) {
    // Return time in HH:MM format
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function dateTimeFormat(date) {
    // Return date and time in DD/MM/YYYY HH:MM format
    return `${dateFormat(date)} ${timeFormat(date)}`;
}

export {
    dateFormat,
    timeFormat,
    dateTimeFormat
}