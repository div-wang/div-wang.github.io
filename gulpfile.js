var gulp = require('gulp'),
    sass = require('gulp-sass'),
    swig = require('gulp-swig'),
    serve = require('gulp-serve'),
    markdown = require('gulp-markdown'),
    mdTpl = require('./lib/markdownTpl.js')

gulp.task('serve', serve({
    port: '3000',
    root: ['./div-wang']
}))

gulp.task('css', function() {
    gulp.src('./src/static/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./div-wang/static/css'))
})

gulp.task('img', function() {
    gulp.src('./src/static/img/')
        .pipe(gulp.dest('./div-wang/static/'))
})

gulp.task('html', function() {
    var time = new Date().getTime()
    gulp.src('./src/html/index.html')
        .pipe(swig({
            defaults: {
                cache: false,
                locals: {
                    time: time,
                    blog: false
                }
            }
        }))
        .pipe(gulp.dest('./div-wang'))
})

gulp.task('md', function() {
    var time = new Date().getTime()
    gulp.src('./src/html/blog/*.md')
        .pipe(markdown())
        .pipe(mdTpl())
        .pipe(swig({
            defaults: {
                cache: false,
                locals: {
                    time: time,
                    blog: true
                }
            }
        }))
        .pipe(gulp.dest('./div-wang/blog'))
});

gulp.task('blog', ['md'], function() {
    var time = new Date().getTime()
    gulp.src('./src/html/blog/*.html')
        .pipe(swig({
            defaults: {
                cache: false,
                locals: {
                    time: time,
                    blog: true
                }
            }
        }))
        .pipe(gulp.dest('./div-wang/blog'))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['css'])
    gulp.watch('./src/html/*.html', ['html'])
    gulp.watch('./src/html/blog/*.md', ['blog'])
})

gulp.task('build', ['css', 'img', 'blog', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])

