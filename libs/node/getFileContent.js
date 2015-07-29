var fs = require('fs');
function getFileContent(filePath) {
    return fs.readFileSync(filePath).toString();
}