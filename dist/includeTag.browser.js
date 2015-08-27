(function (window) {
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    // Regex to split the tail part of the above into [*, dir, basename, ext]
    var splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
    // Function to split a filename into [root, dir, basename, ext]
    // windows version
    var splitPath = function (filename) {
        // Separate device+slash from tail
        var result = splitDeviceRe.exec(filename), device = (result[1] || '') + (result[2] || ''), tail = result[3] || '';
        // Split the tail into dir, basename and extension
        var result2 = splitTailRe.exec(tail), dir = result2[1], basename = result2[2], ext = result2[3];
        return [
            device,
            dir,
            basename,
            ext
        ];
    };
    var path = {
        join: function () {
            var paths = Array.prototype.slice.call(arguments, 0);
            return paths.join('/');
        },
        dirname: function (path) {
            var result = splitPath(path), root = result[0], dir = result[1];
            if (!root && !dir) {
                // No dirname whatsoever
                return '.';
            }
            if (dir) {
                // It has a dirname, strip trailing slash
                dir = dir.substr(0, dir.length - 1);
            }
            return root + dir;
        }
    };
    function getFileContent(filePath) {
        var oReq = new XMLHttpRequest();
        oReq.open('get', filePath, false);
        oReq.send();
        return oReq.response;
    }
    var RE_INCLUDE_TAG = /<include.*?><\/include>/gi;
    var RE_VARIABLE = /{{(.+?)}}/gi;
    function includeTag(cwd, contents) {
        return contents.replace(RE_INCLUDE_TAG, function (tag) {
            var attributes, filePath, result;
            attributes = parseAttributes(tag);
            if (!attributes.src)
                throw new Error('src is required for <include> tag');
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
    window.includeTag = {
        init: function () {
            var includes = document.querySelectorAll('include');
            includes = Array.prototype.slice.apply(includes);
            includes.forEach(this.exec);
        },
        exec: function (el) {
            el.outerHTML = includeTag('.', el.outerHTML);
        }
    };
    window.includeTag.init();
}(window));