var gulp = require('gulp'),
    swig = require('gulp-swig'),
    markdown = require('gulp-markdown'),
    through = require('through2'),
    fs = require('fs'),
    path = require('path')

module.exports = function mdFile(opt) {
    return through.obj(function(file, enc, cb) {

        if (file.isNull()) {
            this.push(file)
            return cb()
        }
        
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'))
            return cb()
        }

        var content = file.contents.toString()
        var title = content.split('</h1>')[0].split('>')[1]
        var head = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">{% include "../static/blog-css.html" %} <title>' + title + '</title></head><body>{% include "../common/head.html" %}<article class="markdown-body">'
        var foot = '</article>{% include "../common/foot.html" %}</body></html>'

        var summary = content.split('</blockquote>')[0].split('</p>')[0].split('<p>')[1]
        var link = path.basename(file.path).replace(/md/,'html')
        var listHtml = '\
            <div class="member">\
                <a class="member-name" target="_blank" href="/blog/'+link+'">'+title+'{% include \'../icons/link.html\' %}</a>\
                <div class="member-skills">\
                    '+summary+'\
                </div>\
            </div>'
        fs.appendFile('src/html/common/list.html', listHtml, 'utf8', function(err){
            if (err) throw err;
        });   

        var data = {
            time: new Date().getTime()
        }
        gulp.src('./src/html/*.html')
            .pipe(swig({
                defaults: {
                    cache: false,
                    locals: data
                }
            }))
        .pipe(gulp.dest('./'))

        file.contents = new Buffer(head + content + foot)
        this.push(file)
        cb()
    });
};
