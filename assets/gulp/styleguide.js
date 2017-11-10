"use strict"

var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'public/styleguide';
const runSequence = require("run-sequence");


const {src,dest,scss_option} = global;

const target = src+'assets/scss/';

const styelguideConfig = {
  title: 'My Styleguide',
  server: true,
  rootPath: 'public',
  appRoot: '/styleguide',
  overviewPath: 'styleguide.md',
  disableEncapsulation: true,
  enablePug: true,
  extraHead:[
    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">',
    '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>',
    '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>',
    '<script type="text/javascript" src="/js/script.js"></script>',
    '<style>.sg-logo,.sg-design{display:none}</style>'
  ],
}

// サーバを生成するタスク : ウォッチ機能も付く
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
gulp.task('styleguide:generateOnly', function() {
    return gulp.src(target)
        .pipe(styleguide.generate(styelguideConfig))
        .pipe(gulp.dest(outputPath));
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

gulp.task('styleguide:build', ["styleguide:generateOnly", "styleguide:applystyles"]);

gulp.task('styleguide:dev', ['styleguide:generate','styleguide:applystyles']);

gulp.task('styleguide:server', ['styleguide:dev'],()=>{
    gulp.watch(target+'**/*.scss',["styleguide:dev"])
});

gulp.task('styleguide', ['styleguide:build']);
