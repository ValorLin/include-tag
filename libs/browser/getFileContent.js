function getFileContent(filePath) {
    var oReq = new XMLHttpRequest();
    oReq.open("get", filePath, false);
    oReq.send();
    return oReq.response;
}