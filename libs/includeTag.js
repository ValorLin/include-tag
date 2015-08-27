var RE_INCLUDE_TAG = /<include.*?><\/include>/gi;
var RE_VARIABLE = /{{(.+?)}}/gi;

function includeTag(cwd, contents) {
    return contents.replace(RE_INCLUDE_TAG, function (tag) {
        var attributes, filePath, result;

        attributes = parseAttributes(tag);

        if (!attributes.src) throw new Error('src is required for <include> tag');

        filePath = path.join(cwd, attributes.src);

        result = getFileContent(filePath);
        result = result.replace(RE_VARIABLE, function (_, key) {
            return attributes[key];
        });

        if (RE_INCLUDE_TAG.test(result)) {
            return includeTag(path.dirname(filePath), result);
        } else {
            return result;
        }
    });
}

var RE_ATTRIBUTES = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gi;
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