var includeTag = require('./includeTag');

module.exports = function (cwd, contents) {
    var getFileContent = function (filePath) {
        return fs.readFileSync(filePath).toString();
    };

    return includeTag(cwd, contents, getFileContent);
};