function formatFileSize(bytes,decimalPoint) {
    if(bytes === 0) return '0 KB';
    const k = 1024,
        dm = decimalPoint || 2,
        sizes = ['KB', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]).toString();
}

export {formatFileSize};