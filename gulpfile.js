/**
 * gulp 任务
 * @author xierenhong
 * @file
 * @module Native
 * @time 2015/4/29
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
//合并文件
var concat = require('gulp-concat');
//压缩js
var uglify = require('gulp-uglify');
//重命名
var rename = require('gulp-rename');
//压缩css
var minifyCss = require('gulp-minify-css');
//删除文件
var del = require("del");
//requirejs
var rjs = require('gulp-requirejs');
//监测
gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

var paths = {
    core: [
        'app/lib/jquery/jquery-2.1.1.min.js',
        'app/lib/ionic/ionic.bundle.min.js',
        'app/lib/angular-ui/angular-local-storage.min.js',
        'app/lib/mobiscroll/ionicMobile.mob.all.min.js'
    ],
    css: [
        'assets/css/ionic/ionic.min.css',
        'assets/css/mobiscroll/ionicMobile.mob.all.min.css'
    ]
};

//合并压缩Javascript
gulp.task('js', function () {
    gulp.src(paths.core)
        .pipe(concat('ionic.mobile.all.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(jshint())
        .pipe(uglify({
            ASCLLOnly: true
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist/'));

});

gulp.task('css', function () {
    gulp.src(paths.css)
        .pipe(concat('ionic.mobile.all.css'))
        .pipe(gulp.dest('assets/themes'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('assets/themes'));
});