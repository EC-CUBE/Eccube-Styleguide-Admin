"use strict"

var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'public';
const runSequence = require("run-sequence");


const {src,dest,scss_option} = global;

const target = src+'assets/scss/';

const styelguideConfig = {
  title: 'My Styleguide',
  server: false,
  rootPath: 'public/',
  overviewPath: 'styleguide.md',
  disableEncapsulation: true,
  enablePug: true,
  extraHead:[
    '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css", rel="stylesheet", integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN", crossorigin="anonymous">',
    '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>',
    '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>',
    '<script type="text/javascript" src="/js/script.js"></script>',
    '<style>.sg-logo,.sg-design{display:none}</style>'
  ],
}

// サーバを生成するタスク
gulp.task('styleguide:generate', function() {
    var options = Object.assign({},styelguideConfig,{
      server:true,
      port: 4000
    })
    return gulp.src(target+'**/*.scss')
        .pipe(styleguide.generate(options))
        .pipe(gulp.dest(outputPath));
});

// サーバを生成せずビルドするだけ
gulp.task('styleguide:build:generate', function() {
  styelguideConfig.appRoot = "/styleguide/"
    return gulp.src(target+'**/*.scss')
        .pipe(styleguide.generate(styelguideConfig))
        .pipe(gulp.dest(outputPath+"/styleguide/"));
});

gulp.task('styleguide:build:applystyles', function() {
  return gulp.src(target+'app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath+"/styleguide/"));
});


gulp.task('styleguide:applystyles', function() {
    const plumber = require("gulp-plumber")
    return gulp.src(target+'app.scss')
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(outputPath));
});

// // スタイルガイドに必要な画像を移動させる
// gulp.task('styleguide:image', function(){
//     return gulp.src(dest+'/image/**/*.png')
//         .pipe(gulp.dest("./styleguide/image"));
// });

gulp.task('styleguide:build', ["styleguide:build:generate", "styleguide:build:applystyles"]);

gulp.task('styleguide:dev', ['styleguide:generate','styleguide:applystyles']);

gulp.task('styleguide:server', ['styleguide:dev'],()=>{
    gulp.watch(target+'**/*.scss',["styleguide:dev"])
});

gulp.task('styleguide', ['styleguide:build']);

global.build.push('styleguide')