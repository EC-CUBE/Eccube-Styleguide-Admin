"use strict";

const gulp = require('gulp');
// Update require to use nanasess-sc5-styleguide
const styleguide = require('nanasess-sc5-styleguide');
const sassCompiler = require('sass'); // Import sass compiler
const gulpSass = require('gulp-sass')(sassCompiler); // Pass compiler to gulp-sass
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

const { src, dest } = global; // Removed scss_option as it's not used here
const outputPath = dest; // Use global.dest
const styleguideDest = `${outputPath}styleguide/`;
const sassSrcPath = `${src}assets/scss/`;

const styleguideConfig = {
    title: 'EC-CUBE Admin Styleguide',
    // server: false, // Controlled by specific tasks
    rootPath: styleguideDest,
    overviewPath: `${src}styleguide.md`,
    disableHtml5Mode: true, // Recommended for compatibility
    disableEncapsulation: true,
    enablePug: true,
    extraHead: [
        // Corrected HTML syntax and added missing quotes
        '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">',
        '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>',
        '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>',
        // Use relative path from styleguideDest for custom script
        '<script type="text/javascript" src="../js/script.js"></script>',
        '<style>.sg-logo,.sg-design{display:none}</style>',
        '<style>.view-index{background-color:#fff}</style>'
    ],
    // Remove the problematic styleguideProcessors configuration
    // styleguideProcessors: { ... }
};

// --- Styleguide Tasks (Gulp 4) ---

// Generate task (for server)
function styleguideGenerate() {
    const options = { ...styleguideConfig, server: true, port: 4000, rootPath: outputPath }; // Serve from 'public'
    return gulp.src(sassSrcPath + '**/*.scss')
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(styleguide.generate(options))
        .pipe(gulp.dest(outputPath));
}

// Apply styles task (for server)
function styleguideApplyStylesServer() {
    return gulp.src(sassSrcPath + 'app.scss')
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(outputPath)); // Apply to 'public'
}

// Generate task (for build)
function styleguideGenerateBuild() {
    const options = { ...styleguideConfig, appRoot: "/styleguide/", server: false, rootPath: styleguideDest }; // Build to 'public/styleguide'
    return gulp.src(sassSrcPath + '**/*.scss')
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(styleguide.generate(options))
        .pipe(gulp.dest(styleguideDest));
}

// Apply styles task (for build)
function styleguideApplyStylesBuild() {
    return gulp.src(sassSrcPath + 'app.scss')
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(styleguideDest)); // Apply to 'public/styleguide'
}

// Combined build task
const styleguideBuild = gulp.parallel(styleguideGenerateBuild, styleguideApplyStylesBuild);

// Combined server task (generate + apply styles)
const styleguideDev = gulp.parallel(styleguideGenerate, styleguideApplyStylesServer);

// Watch task
function watchStyleguide() {
    // Watch sass files and run the dev task on change
    return gulp.watch(sassSrcPath + '**/*.scss', gulp.series(styleguideDev));
}

// Removed old task definitions and global assignments

// Export tasks for use in gulpfile.js
module.exports = {
    styleguideBuild: styleguideBuild,
    styleguideServer: styleguideDev, // Renamed from styleguide:dev
    styleguideGenerate: styleguideGenerate, // Export the generate task
    styleguideApply: styleguideApplyStylesServer, // Export apply styles separately if needed
    watchStyleguide: watchStyleguide
};