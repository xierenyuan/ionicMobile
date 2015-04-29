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
//图片压缩
var imagemin = require('gulp-imagemin');
//压缩css
var minifyCss = require('gulp-minify-css');
//删除文件
var del = require("del");
//requirejs
var rjs = require('gulp-requirejs');
//编译 sass
var sass = require('gulp-sass');
