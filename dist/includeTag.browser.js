var path = require('path');
var fs = require('fs');
function getFileContent(filePath) {
    return fs.readFileSync(filePath).toString();
}
var REG_EXP = /<include.+?src="(.*?)".*?><\/include>/gi;

function includeTag(cwd, contents) {
    return contents.replace(REG_EXP, function (_, innerFile) {
        var filePath = path.join(cwd, innerFile);
        var result = getFileContent(filePath);
        if (REG_EXP.test(result)) {
            return includeTag(path.dirname(filePath), result);
        } else {
            return result;
        }
    });
}