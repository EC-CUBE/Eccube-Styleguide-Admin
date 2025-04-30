"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create(); // Use create() for instance

const { src, dest } = global;

const fs = require("fs");
const path = require("path");
const url = require("url");
const pug = require("pug");

const pugMiddleWare = (req, res, next) => {
    const baseDir = process.cwd(); // Corrected variable name
    const pugPath = getPugTemplatePath(baseDir, req);

    if (pugPath === false) {
        return next();
    }

    try {
        console.log("[BS] try to file " + pugPath);
        fs.statSync(pugPath); // Check if file exists
        const content = pug.renderFile(pugPath, {
            locals: {},
            pretty: true,
            basedir: baseDir,
            compileDebug: true,
            doctype: "html"
        });
        res.setHeader('Content-Type', 'text/html'); // Set content type
        // Use Buffer.from() instead of new Buffer()
        res.end(Buffer.from(content));
    } catch (e) {
        // Check if error is because file doesn't exist
        if (e.code === 'ENOENT') {
            console.log("[BS] File not found: " + pugPath);
        } else {
            // Log other errors
            console.error("[BS] Pug render error:", e);
        }
        return next(); // Continue if file not found or error occurs
    }
};

const getPugTemplatePath = (baseDir, req) => {
    const parsedUrl = url.parse(req.url);
    let requestPath = parsedUrl.pathname;

    // If it's a directory path, assume index.pug
    if (requestPath.endsWith('/')) {
        requestPath += 'index.html';
    }

    // Only handle .html requests
    if (!requestPath.endsWith('.html')) {
        return false;
    }

    // Convert .html to .pug
    requestPath = requestPath.replace(/\.html$/, ".pug");

    // Construct the potential path to the Pug file
    const potentialPath = path.join(baseDir, "assets/tmpl/moc", requestPath);

    // Check if the corresponding .pug file exists
    try {
        fs.accessSync(potentialPath, fs.constants.R_OK);
        return potentialPath;
    } catch (err) {
        // If the direct path doesn't exist, check for index.pug in the directory
        const dirPath = path.dirname(potentialPath);
        const indexPath = path.join(dirPath, path.basename(requestPath, '.pug'), 'index.pug');
        try {
            fs.accessSync(indexPath, fs.constants.R_OK);
            return indexPath;
        } catch (innerErr) {
            return false; // Neither file exists
        }
    }
};

function serverTask() {
    browserSync.init({
        server: {
            baseDir: dest, // Use global.dest
            directory: true, // Enable directory listing
            middleware: [pugMiddleWare] // Add the Pug middleware
        },
        port: 3000, // Specify a port (default is 3000)
        open: true,
        notify: false // Disable notifications
    });

    // Watch for changes in the destination directory and reload
    // Note: Pug and Sass tasks already trigger reloads via browserSync.stream()
    // This watcher might be redundant or cause double reloads if not careful.
    // Consider removing if Pug/Sass watch covers all needs.
    // gulp.watch([`${dest}/**/*`], browserSync.reload);
}

// Export the server task
module.exports = {
    browserSync: serverTask
    // No separate reload task needed as stream() is used in pug/sass tasks
};
