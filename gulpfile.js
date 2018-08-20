var gulp = require('gulp');

var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');

var plumber = require('gulp-plumber');
var through = require('gulp-through');

var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');

var psi = require('psi');

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
        server: 'dist'
    });

    gulp.watch('src/app.styl', ['stylus']);
    gulp.watch('dist/index.html').on('change', browserSync.reload);
});

// test
gulp.task('speed', function() {
    psi.output('localhost:3000').then(() => {
        console.log('done');
    });
});

gulp.task('default', ['dev']);