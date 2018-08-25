var gulp = require('gulp');

var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');

var plumber = require('gulp-plumber');

var browserSync = require('browser-sync').create();

// dev
gulp.task('stylus', function() {
    return gulp.src('src/app.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(postcss())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('dev', function() {
    browserSync.init({
        server: '.'
    });

    gulp.watch('src/app.styl', ['stylus']);
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('default', ['dev']);
