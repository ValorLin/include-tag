var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('browser', function () {
    return gulp.src([
        './libs/browser/path.js',
        './libs/browser/getFileContent.js',
        './libs/includeTag.js'
    ])
        .pipe(concat('includeTag.browser.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('node', function () {
    return gulp.src([
        './libs/node/path.js',
        './libs/node/getFileContent.js',
        './libs/includeTag.js'
    ])
        .pipe(concat('includeTag.js'))
        .pipe(gulp.dest('./dist/'));
});