const gulp = require("gulp");

global.src = "./";
global.dest = "./public/";

// Load tasks
const pugTasks = require("./assets/gulp/pug.js");
const sassTasks = require("./assets/gulp/sass.js");
// const webpackTasks = require("./assets/gulp/webpack.js"); // Keep commented for now
const styleguideTasks = require("./assets/gulp/styleguide.js");
const browserSyncTasks = require("./assets/gulp/browserSync.js");

// --- Individual Tasks ---

// Simple file move task
gulp.task("mv", () => {
  return gulp.src([
    `${global.src}static/**/*`
  ])
    .pipe(gulp.dest(`${global.dest}`));
});

// --- Composite Tasks (Gulp 4 style) ---

// Development task for MOC pages
gulp.task('dev:moc', gulp.series(
  (done) => { /* Add init step if needed, e.g., clean public dir */ done(); },
  gulp.parallel(pugTasks.pug, sassTasks.sass, "mv"), // Compile Pug, Sass, move static files
  gulp.parallel(browserSyncTasks.browserSync, pugTasks.watchPug, sassTasks.watchSass) // Start server and watch files
));

// Development task for Styleguide
gulp.task('dev:sg', gulp.series(
  (done) => { /* Add init step if needed */ done(); },
  gulp.parallel(pugTasks.pug, sassTasks.sass, "mv"), // Compile Pug, Sass, move static files
  styleguideTasks.styleguideApply, // Apply styleguide specifics
  gulp.parallel(styleguideTasks.styleguideServer, pugTasks.watchPug, sassTasks.watchSass, styleguideTasks.watchStyleguide) // Start styleguide server and watch files
));

// Combined Development task
gulp.task('dev', gulp.parallel('dev:moc', 'dev:sg')); // Note: Running two servers might conflict on ports. Adjust browserSync config if needed.

// Build task
gulp.task("build", gulp.series(
  (done) => { /* Add init step if needed, e.g., clean public dir */ done(); },
  gulp.parallel(pugTasks.pug, sassTasks.sass, "mv"), // Compile Pug, Sass, move static files
  styleguideTasks.styleguideBuild // Build styleguide
));

// Default task (alias for build)
gulp.task("default", gulp.series("build"));

