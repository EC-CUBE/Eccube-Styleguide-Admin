"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browserSync = require('browser-sync');
const through = require('through2'); // Import through2

const { src, dest, jade_option } = global;

function pugTask() {
    let options = (jade_option) ? jade_option : {
        locals: {},
        pretty: true,
        basedir: process.cwd(),
        doctype: "html"
    };
    let srcPattern = [
        `${src}assets/tmpl/moc/**/*.pug`,
        `!${src}assets/tmpl/moc/**/_*`,
    ];
    return gulp.src(srcPattern)
        .pipe($.plumber({
            errorHandler: $.notify.onError('<%= error.message %>')
        }))
        .pipe($.pug(options))
        .pipe(gulp.dest(`${dest}/`))
        // Only stream if browserSync is active
        .pipe(browserSync.active ? browserSync.stream() : through.obj());
}

function watchPug() {
    let target = [
        `${src}assets/tmpl/**/*`,
    ];
    // Use gulp.series to run pugTask then reload
    return gulp.watch(target, gulp.series(pugTask));
}

// Export tasks for use in gulpfile.js
module.exports = {
    pug: pugTask,
    watchPug: watchPug
};
