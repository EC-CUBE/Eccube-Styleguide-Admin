"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass')(sassCompiler);
const browserSync = require('browser-sync');
const through = require('through2'); // Import through2

const { src, dest, scss_option } = global;

function sassTask() {
    let options = (scss_option) ? scss_option : {
        // sourceMap: true, // Sourcemaps are handled by gulp-sourcemaps
    };

    let srcPattern = [
        `${src}assets/scss/**/*.scss`
    ];

    return gulp.src(srcPattern)
        .pipe($.plumber({
            errorHandler: $.notify.onError('<%= error.message %>')
        }))
        .pipe($.sourcemaps.init())
        .pipe(gulpSass(options).on('error', gulpSass.logError))
        .pipe($.pleeease({
            autoprefixer: true,
            minifier: true,
            mqpacker: true
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(`${dest}assets/css/`))
        // Only stream if browserSync is active
        .pipe(browserSync.active ? browserSync.stream() : through.obj());
}

function watchSass() {
    let target = [
        `${src}assets/scss/**/*.scss`,
    ];
    // Use gulp.series to run sassTask
    return gulp.watch(target, gulp.series(sassTask));
}

// Export tasks for use in gulpfile.js
module.exports = {
    sass: sassTask,
    watchSass: watchSass
};
