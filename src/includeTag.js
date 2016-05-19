var path = require('path');

var RE_ATTRIBUTES = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gi;
var RE_INCLUDE_TAG = /<include.*?><\/include>/gi;
var RE_VARIABLE = /{{(.+?)}}/gi;

function parseAttributes(tag) {
    var arr, key, value, matches, attributes;

    matches = tag.match(RE_ATTRIBUTES);
    attributes = {};

    matches.forEach(function (match) {
        arr = match.split('=');
        key = arr[0];
        value = arr[1].replace(/^['"]|['"]$/gi, '');
        attributes[key] = value;
    });
    return attributes;
}

function includeTag(cwd, contents, getFileContent) {
    return contents.replace(RE_INCLUDE_TAG, function (tag) {
        var attributes, filePath, result, fileContent;

        attributes = parseAttributes(tag);

        // src is required
        if (!attributes.src) throw new Error('src is required for <include> tag');

        filePath = path.join(cwd, attributes.src);
        fileContent = getFileContent(filePath);
        result = applyVariables(fileContent, attributes);

        if (RE_INCLUDE_TAG.test(result)) {
            return includeTag(path.dirname(filePath), result, getFileContent);
        } else {
            return result;
        }
    });
}

function applyVariables(str, attributes) {
    return str.replace(RE_VARIABLE, function (_, key) {
        return attributes[key];
    });
}

function parseAttributes(tag) {
    var arr, key, value, matches, attributes;

    matches = tag.match(RE_ATTRIBUTES);
    attributes = {};

    matches.forEach(function (match) {
        arr = match.split('=');
        key = arr[0];
        value = arr[1].replace(/^['"]|['"]$/gi, '');
        attributes[key] = value;
    });
    return attributes;
}

module.exports = includeTag;
