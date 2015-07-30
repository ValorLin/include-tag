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