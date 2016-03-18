var gulp = require('gulp'),
    sass = require('gulp-sass'),
    swig = require('gulp-swig'),
    markdown = require('gulp-markdown'),
    mdTpl = require('./markdownTpl.js'),
    fs = require('fs'),
    path = require('path'),
    through = require('through2')

function css(){
   gulp.src('./src/static/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./static/css')) 
}

function js(){
    gulp.src('./src/static/js/**')
        .pipe(gulp.dest('./static/js'))
}

function img(){
    gulp.src('./src/static/img/**')
        .pipe(gulp.dest('./static/img'))
}

function bower(){
    gulp.src('./src/static/bower_components/**')
        .pipe(gulp.dest('./static/bower'))
}

function md(){
    var data = {
        time: new Date().getTime()
    }
    fs.writeFile('src/html/common/list.html', '', 'utf8', function(err){
        if (err) throw err;
    });
    gulp.src('./src/html/blog/*.md')
        .pipe(markdown())
        .pipe(mdTpl())
        .pipe(swig({
            defaults: {
                cache: false,
                locals: data
            }
        }))
        .pipe(gulp.dest('./blog'))
}

module.exports = function() {
    css()
    js()
    img()
    bower()
    md()
    gulp.watch('./src/html/blog/*.md', md);
};
