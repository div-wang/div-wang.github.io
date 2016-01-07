var gulp = require('gulp'),
    sass = require('gulp-sass'),
    swig = require('gulp-swig'),
    markdown = require('gulp-markdown'),
    mdTpl = require('./lib/markdownTpl.js'),
    getServe = require('./lib/app.js')

gulp.task('serve', getServe({
    port: '3000',
    root: '/div-wang'
}))

gulp.task('css', function() {
    gulp.src('./src/static/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./div-wang/static/css'))
})

gulp.task('js', function() {
    gulp.src('./src/static/js/**')
        .pipe(gulp.dest('./div-wang/static/js'))
})

gulp.task('img', function() {
    gulp.src('./src/static/img/**')
        .pipe(gulp.dest('./div-wang/static/img'))
})

gulp.task('bower', function() {
    gulp.src('./src/static/bower_components/**')
        .pipe(gulp.dest('./div-wang/static/bower'))
})

gulp.task('index', function() {
    var data = {
        time: new Date().getTime(),
        blog: ''
    }
    gulp.src('./src/html/index.html')
        .pipe(swig({
            defaults: {
                cache: false,
                locals: data
            }
        }))
        .pipe(gulp.dest('./div-wang'))
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
        .pipe(gulp.dest('./div-wang/blog'))
});

gulp.task('blog', ['md'], function() {
    var data = {
        time: new Date().getTime(),
        blog: 'cur'
    }
    gulp.src('./src/html/blog/*.html')
        .pipe(swig({
            defaults: {
                cache: false,
                locals: data
            }
        }))
        .pipe(gulp.dest('./div-wang/blog'))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['css'])
    gulp.watch('./src/html/*.html', ['index'])
    gulp.watch('./src/html/blog/*.md', ['blog'])
})

gulp.task('build', ['css', 'js', 'img', 'bower', 'blog', 'index'])

gulp.task('default', ['build', 'watch', 'serve'])

