var _includeTag = require('./includeTag');

window.includeTag = {
    init: function () {
        var includes = document.getElementsByTagName('include');
        includes = Array.prototype.slice.apply(includes);
        includes.forEach(this.exec);
    },
    exec: function (el) {
        var getFileContent = function (filePath) {
            var oReq = new XMLHttpRequest();
            oReq.open("get", filePath, false);
            oReq.send();
            return oReq.response;
        };

        el.outerHTML = _includeTag('.', el.outerHTML, getFileContent);
    }
};

window.includeTag.init();