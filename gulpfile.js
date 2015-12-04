var gulp = require('gulp'),
  sass = require('gulp-sass'),
  swig = require('gulp-swig'),
  serve = require('gulp-serve'),
  markdown = require('gulp-markdown'),
  markdownDocs = require('gulp-markdown-docs');

gulp.task('serve', serve({
  port: '3000',
  root: ['./div-wang']
}))

gulp.task('css', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./div-wang/static/css'))
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

gulp.task('blog', function() {
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

gulp.task('md', function () {
    gulp.src('./src/blog/*.md')
      .pipe(markdown())
      .pipe(gulp.dest('./blog'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', ['css'])
  gulp.watch('./src/html/*.html', ['html'])
  gulp.watch('./src/blog/*.md', ['html'])
})

gulp.task('build', ['css', 'blog', 'html', 'md'])

gulp.task('default', ['build', 'watch', 'serve'])
