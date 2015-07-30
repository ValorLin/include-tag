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