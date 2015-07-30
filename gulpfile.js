var gulp = require('gulp');
var concat = require('gulp-concat');
var wrapJs = require('gulp-wrap-js');

gulp.task('browser', function () {
    return gulp.src([
            './libs/browser/path.js',
            './libs/browser/getFileContent.js',
            './libs/includeTag.js',
           './libs/browser/browser.js'
        ])
        .pipe(concat('includeTag.browser.js'))
        .pipe(wrapJs('(function(window){%= body %})(window)'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('node', function () {
    return gulp.src([
            './libs/node/path.js',
            './libs/node/getFileContent.js',
            './libs/includeTag.js',
            './libs/node/node.js'
        ])
        .pipe(concat('includeTag.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['node', 'browser']);