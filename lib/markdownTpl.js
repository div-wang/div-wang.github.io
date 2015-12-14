var through = require('through2'),
    fs = require('fs')

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

        file.contents = new Buffer(head + content + foot)
        this.push(file)
        cb()
    });
};
