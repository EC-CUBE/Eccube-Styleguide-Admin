"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

const browserSync = require("browser-sync");

const {src,dest} = global;

const fs = require("fs")
const path = require("path")
const url = require("url")
const pug = require("pug")

const pugMiddleWare = (req, res, next) => {

    const basedir = process.cwd();
    const pugPath = getPugTemplatePath(basedir,req)

    if ( pugPath === false ) {
        return next();
    }

    try{
        console.log("[BS] try to file "+ pugPath)
        fs.statSync(pugPath)
        const content = pug.renderFile(pugPath, {
            locals:{},
            pretty: true,
            basedir,
            compileDebug: true,
            doctype: "html"
        });
        res.end(new Buffer(content));
    }catch (e){
        console.log(e)
        return next();
    }
}

const getPugTemplatePath = (baseDir,req)=>{
    let requestPath = url.parse(req.url).pathname.replace(".html",".pug");
    if (
      path.parse(requestPath).ext &&
      path.parse(requestPath).ext !== ".pug"
    ) {
      return false;
    }
    const suffix = path.parse(requestPath).ext ? "": "index.pug"
    return path.join(baseDir,"assets/tmpl/moc/",requestPath,suffix);
}


gulp.task("server",()=> {

    // var config = {
    //     proxy: "127.0.0.1:8000",
    //     open: "external",
    //     //notify: false
    // };
    //
    // var server = {
    //     base: `${dest}`,
    // }
    //
    // php.server(server,() => {
    //     browserSync(config)
    // });

  browserSync({
    // proxy:"localhost:4000",
    // serveStatic:["./public",],
    server:{
        middleware: [pugMiddleWare],
        baseDir:"public",
        index: "index.html",
    },
    // middleware: [pugMiddleWare],
    open:true,

  })

    // browserSync({
    //     server:{
    //         middleware: [pugMiddleWare],
    //         baseDir:"public",
    //         index: "index.html",
    //     },
    //     open: "external",
    // })
    return gulp.watch([
        `${dest}/**/*`,
        `${src}/assets/tmpl/**/*`
    ], (e) => {
        // console.log(e)
        setTimeout(function(){
            browserSync.reload();
        },500);
    });
});

gulp.task("server:reload",()=>{
    browserSync.reload();
})

global.watch.push("server")
