var gulp = require('gulp'),
    sass = require('gulp-sass'),
    swig = require('gulp-swig'),
    markdown = require('gulp-markdown'),
    mdTpl = require('./lib/markdownTpl.js'),
    getServe = require('./lib/app.js')

gulp.task('serve', getServe({
    port: '3000',
    root: '/'
}))

gulp.task('css', function() {
    gulp.src('./src/static/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./static/css'))
})

gulp.task('js', function() {
    gulp.src('./src/static/js/**')
        .pipe(gulp.dest('./static/js'))
})

gulp.task('img', function() {
    gulp.src('./src/static/img/**')
        .pipe(gulp.dest('./static/img'))
})

gulp.task('bower', function() {
    gulp.src('./src/static/bower_components/**')
        .pipe(gulp.dest('./static/bower'))
})

gulp.task('md', function() {
    var data = {
        time: new Date().getTime(),
        blog: 'cur'
    }
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
});

gulp.task('blog', ['md'], function() {
    var data = {
        time: new Date().getTime(),
        blog: 'cur'
    }
    gulp.src('./src/html/*.html')
        .pipe(swig({
            defaults: {
                cache: false,
                locals: data
            }
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['css'])
    gulp.watch('./src/html/*.html', ['blog'])
    gulp.watch('./src/html/blog/*.md', ['md']) 
})

gulp.task('build', ['css', 'js', 'img', 'bower', 'blog'])

gulp.task('default', ['build', 'watch', 'serve'])

